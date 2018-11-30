import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-executor/top-sequence-ui.service';
import { FormBuilder, Validators } from '@angular/forms';
import { META_VALUE_ValidationTypes, TYPE_ValidationTypes, ValidationTypes } from 'models/api-models';
import { ComponentDynamicStates } from '../../../app-common/dynamic-state/dynamic-state.component';

@Component({
  selector: 'app-sr-large-text',
  templateUrl: './large-text.component.html',
  styleUrls: ['./large-text.component.scss']
})
export class LargeTextComponent extends BaseResponse implements OnChanges {

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
      const requiredConstraint = this.question.formatConstraints.find(fc => fc.validationType === ValidationTypes.META_VALUE);

      const requiredValidator = requiredConstraint && requiredConstraint.validationSubType === META_VALUE_ValidationTypes.EXISTS && requiredConstraint.booleanConstraint ? Validators.required : null;

      this.formGroup = this.fb.group({content: this.fb.control('', requiredValidator)});
    }

    if (question && !changes.question.previousValue) {
      this.$state.next(ComponentDynamicStates.VIEWING);
    }
  }

}
