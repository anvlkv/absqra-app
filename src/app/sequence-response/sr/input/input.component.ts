import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-ui.service';
import { META_VALUE_ValidationTypes, TYPE_ValidationTypes, ValidationTypes } from '../../../../models/api-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentDynamicStates } from '../../../app-common/dynamic-state/dynamic-state.component';


@Component({
  selector: 'app-sr-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends BaseResponse implements OnChanges {
  inputType: TYPE_ValidationTypes;

  constructor(
    public responseService: ResponseService,
    public responseUI: TopSequenceUIService,
    public fb: FormBuilder
  ) {
    super(responseService, responseUI, fb)
  }

  ngOnChanges(changes: SimpleChanges): void {
    const question = changes.question.currentValue;
    if (question) {
      const typeConstraint = this.question.formatConstraints.find(fc => fc.validationType === ValidationTypes.TYPE);

      this.inputType = typeConstraint && typeConstraint.booleanConstraint ? <TYPE_ValidationTypes>typeConstraint.validationSubType : TYPE_ValidationTypes.IS_TEXT;

      const requiredConstraint = this.question.formatConstraints.find(fc => fc.validationType === ValidationTypes.META_VALUE);

      const requiredValidator = requiredConstraint && requiredConstraint.validationSubType === META_VALUE_ValidationTypes.EXISTS && requiredConstraint.booleanConstraint ? Validators.required : null;

      this.formGroup = this.fb.group({content: this.fb.control('', requiredValidator)});
    }

    if (question && !changes.question.previousValue) {
      this.$state.next(ComponentDynamicStates.VIEWING);
    }
  }

}
