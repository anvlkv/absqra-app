import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import {
  FormatConstraint,
  META_VALUE_ValidationTypes,
  TYPE_ValidationTypes,
  ValidationTypes,
  VALUE_ValidationTypes,
} from 'models/api-models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';


@Component({
  selector: 'app-format-constraint-detail',
  templateUrl: './format-constraint-detail.component.html',
  styleUrls: ['./format-constraint-detail.component.scss', '../styles/sequence-design.scss']
})
export class FormatConstraintDetailComponent extends BaseDetail<FormatConstraint> implements OnInit {
  constraintForm: FormGroup;
  validationTypesValues =  unpackEnum(ValidationTypes);
  currentValidationTypeSubtypes: string[];
  currentConstraintType: 'text' | 'number' | 'boolean';

  private _previousConstrainFormValue: FormatConstraint = <FormatConstraint>{};

  constructor(
    data: DataService,
    private fb: FormBuilder
  ) {
    super(data);
    this.callConfigurator = (formatConstraintId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoFormatConstraintsOfQuestion,
            params: {questionId: this.parentId}
          }
        }
        default: {
          return {
            route: CRUDRouter.entityFormatConstraint,
            params: {formatConstraintId}
          }
        }
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const formatConstraint = loaded ? this.dataItem : this.defaultItem;
      this.constraintForm = this.fb.group({
        ...formatConstraint,
        question: {id: this.parentId},
        stringConstraint: formatConstraint.stringConstraint || null,
        numericConstraint: formatConstraint.numericConstraint || null,
        booleanConstraint: formatConstraint.booleanConstraint || null
      });


      this.setValidationTypes(formatConstraint);

      this._previousConstrainFormValue = formatConstraint;

      this.constraintForm.valueChanges.subscribe((v: FormatConstraint) => {
        this.setValidationTypes(v);
        this._previousConstrainFormValue = v;
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
      }
    });
  }

  private setValidationTypes(constraint: FormatConstraint) {
    if (constraint.validationType && constraint.validationType !== this._previousConstrainFormValue.validationType) {
      this.currentValidationTypeSubtypes = getSubTypes(constraint.validationType)
    }

    if (constraint.validationSubType && constraint.validationSubType !== this._previousConstrainFormValue.validationSubType) {
      this.currentConstraintType = getConstraintType(constraint.validationType, constraint.validationSubType);
    }
  }

  saveConstraint(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;
    if (this.constraintForm.valid) {
      if (this.dataItemId) {
        this.update({...this.dataItem, ...this.constraintForm.value})
      }
      else {
        this.save(this.constraintForm.value);
      }
    }
    return false;
  }
}

function getSubTypes(validationType: ValidationTypes) {
  switch (validationType) {
    case ValidationTypes.TYPE:
      return unpackEnum(TYPE_ValidationTypes);
    case ValidationTypes.VALUE:
      return unpackEnum(VALUE_ValidationTypes);
    case ValidationTypes.META_VALUE:
      return unpackEnum(META_VALUE_ValidationTypes);
    default:
      return null;
  }
}

export function getConstraintType(validationType: ValidationTypes, validationSubType: TYPE_ValidationTypes | VALUE_ValidationTypes | META_VALUE_ValidationTypes): 'text' | 'number' | 'boolean' {

  if (validationType === ValidationTypes.TYPE) {
    return 'boolean'
  }

  switch (validationSubType) {
    case VALUE_ValidationTypes.MAX:
    case VALUE_ValidationTypes.MIN:
    case META_VALUE_ValidationTypes.STRING_LENGTH:
    case META_VALUE_ValidationTypes.VALUES_COUNT:
      return 'number';
    case META_VALUE_ValidationTypes.EXISTS:
    case META_VALUE_ValidationTypes.UNIQUE:
      return 'boolean';
    default:
      return 'text';
  }
}
