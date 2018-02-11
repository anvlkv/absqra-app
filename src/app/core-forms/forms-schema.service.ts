import { Injectable, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../models/Item';
import { QuantityOrder } from '../../models/enums/item.enums';
import {
  META_VALUE_ValidationTypes, ValidationTypes,
  VALUE_ValidationTypes,
} from '../../models/enums/formatConstraint.enums';

export class InputConfig {
  type: string;
  name?: string;
  value?: string | number | boolean | FormConfig;
  required?: boolean;
  min?: number;
  max?: number;
}

export class FormConfig {
  name?: string;
  inputs: Array<InputConfig>;
  constructor() {
    this.name = '';
    this.inputs = [];
  }
}

@Injectable()
export class FormsSchemaService {
  private $formGroup: ReplaySubject<FormGroup> = new ReplaySubject(1);
  private $config: ReplaySubject<FormConfig> = new ReplaySubject(1);
  protected _questionnaire: Partial<Item>;

  @Input()
  get questionnaire() {
    return this._questionnaire;
  }
  set questionnaire (questionnaire) {
    questionnaire.formatConstraints = questionnaire.formatConstraints || [];
    this._questionnaire = questionnaire;
    this.$config.next(this.rebuildConfig());
    this.getConfig().subscribe((config) => {
      this.$formGroup.next(this.buildFormGroup(config));
    });
  }


  constructor(
    private fb: FormBuilder
  ) { }


  rebuildConfig(): FormConfig {
    return buildConfig(this.questionnaire);
  }

  buildFormGroup(config: FormConfig): FormGroup  {
    const group = this.fb.group({});



    config.inputs.forEach(input => {
      let control;
      let inputValidators: any = [
        input.required ? Validators.required : null,
        input.max ? Validators.max(input.max) : null,
        input.min ? Validators.min(input.min) : null
      ].filter(v => !!v);

      if (inputValidators.length) {
        inputValidators = Validators.compose(inputValidators);
      }
      else {
        inputValidators = null;
      }

      switch (input.type) {
        case 'list-input': {
          const innerConfig = <FormConfig>input.value;
          control = this.fb.array(innerConfig.inputs.map(i => this.fb.control(i.value, inputValidators)));
          break;
        }
        case 'select-multiple': {
          const innerConfig = <FormConfig>input.value;
          const innerGroup = {};
          innerConfig.inputs.forEach(i => {
            innerGroup[i.name] = this.fb.control(i.value)
          });
          control = this.fb.group(innerGroup);
          break;
        }
        case 'select-single': {
          control = this.fb.control(null);
          break;
        }
        default: {
          control = this.fb.control(input.value, inputValidators);
          break;
        }
      }
      group.addControl(input.name, control);
    });

    return group;
  }

  getFg() {
    return this.$formGroup.asObservable();
  }

  getConfig() {
    return this.$config.asObservable();
  }
}

function buildConfig(questionnaire: Partial<Item>): FormConfig {
  const config = new FormConfig();
  // this._questionnaire.
  // console.log(this.questionnaire);

  // this.questionnaire.offers

  // if (this.questionnaire.offers == QuantityOrder.NONE && )

  const typeConstraint = questionnaire.formatConstraints.find(constraint => constraint.validationType === ValidationTypes.TYPE);

  const requiredConstraint = questionnaire.formatConstraints.find(constraint => constraint.validationType === ValidationTypes.META_VALUE && constraint.validationSubType == META_VALUE_ValidationTypes.EXISTS);

  const minValueConstraint = questionnaire.formatConstraints.find(constraint => constraint.validationType === ValidationTypes.VALUE && constraint.validationSubType == VALUE_ValidationTypes.MIN);
  const maxValueConstraint = questionnaire.formatConstraints.find(constraint => constraint.validationType === ValidationTypes.VALUE && constraint.validationSubType == VALUE_ValidationTypes.MAX);
  // console.log(requiredConstraint);

  switch (true) {
    case questionnaire.offers == QuantityOrder.NONE
    && questionnaire.expects == QuantityOrder.ONE: {

      const input: InputConfig = {
        type: typeConstraint ? typeConstraint.validationSubType : 'text',
        name: questionnaire.name,
        required: !!requiredConstraint
      };

      minValueConstraint ? input.min = minValueConstraint.numericConstraint : null;
      maxValueConstraint ? input.max = maxValueConstraint .numericConstraint : null;

      config.inputs.push(input);
      break;
    }
    case questionnaire.offers == QuantityOrder.NONE
    && questionnaire.expects == QuantityOrder.MULTIPLE: {
      const subQuestionnaire = {
        offers: QuantityOrder.NONE,
        expects: QuantityOrder.ONE,
        formatConstraints: questionnaire.formatConstraints.filter(fc => {
          return fc.validationType == ValidationTypes.TYPE
          || fc.validationType == ValidationTypes.VALUE
          || fc.validationType == ValidationTypes.META_VALUE
            && fc.validationSubType == META_VALUE_ValidationTypes.STRING_LENGTH;
        })
      } ;

      const input: InputConfig = {
        type: 'list-input',
        name: questionnaire.name,
        required: !!requiredConstraint,
        value: buildConfig(subQuestionnaire)
      };

      minValueConstraint ? input.min = minValueConstraint.numericConstraint : null;
      maxValueConstraint ? input.max = maxValueConstraint .numericConstraint : null;

      config.inputs.push(input);
      break;
    }
    case questionnaire.offers == QuantityOrder.ONE && questionnaire.expects == QuantityOrder.ONE: {
      const input: InputConfig = {
        type: 'yes-no-input',
        name: questionnaire.name,
        required: !!requiredConstraint,
        value: false
      };

      config.inputs.push(input);
      break;
    }
    case questionnaire.offers == QuantityOrder.MULTIPLE && questionnaire.expects == QuantityOrder.MULTIPLE: {
      const checkboxes = questionnaire.assets.map(asset => {
        return <InputConfig> {
            type: 'checkbox',
            name: asset.content,
            value: false
        }
      });
      const input: InputConfig = {
        type: 'select-multiple',
        name: questionnaire.name,
        required: !!requiredConstraint,
        value: { inputs: checkboxes }
      };
      config.inputs.push(input);
      break;
    }
    case questionnaire.offers == QuantityOrder.MULTIPLE && questionnaire.expects == QuantityOrder.ONE: {
      const radios = questionnaire.assets.map(asset => {
        return <InputConfig> {
          type: 'radio',
          name: questionnaire.name,
          value: asset.content
        }
      });
      const input: InputConfig = {
        type: 'select-single',
        name: questionnaire.name,
        value: { inputs: radios}
      };
      config.inputs.push(input);
      break;
    }
  }

  return config;
}
