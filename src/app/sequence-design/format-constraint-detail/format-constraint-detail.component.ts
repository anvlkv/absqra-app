import { Component, Input, OnInit } from '@angular/core';
import {
  FormatConstraint,
  META_VALUE_ValidationTypes,
  TYPE_ValidationTypes,
  ValidationTypes,
  VALUE_ValidationTypes,
} from 'models/api-models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';
import { FormatConstraintDetailService, FormatConstraintPurposes } from './format-constraint-detail.service';


@Component({
  selector: 'app-format-constraint-detail',
  templateUrl: './format-constraint-detail.component.html',
  styleUrls: ['./format-constraint-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [FormatConstraintDetailService]
})
export class FormatConstraintDetailComponent extends BaseDetailForm<FormatConstraint, FormatConstraintDetailService> implements OnInit {
  constraintForm: FormGroup;
  validationTypesValues =  unpackEnum(ValidationTypes);
  currentValidationTypeSubtypes: string[];
  currentConstraintType: 'text' | 'number' | 'boolean';

  @Input()
  formatConstraintPurposeType: FormatConstraintPurposes;

  private _previousConstrainFormValue: FormatConstraint = <FormatConstraint>{};

  constructor(
    formatConstraintService: FormatConstraintDetailService,
    fb: FormBuilder
  ) {
    super(formatConstraintService, fb);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  private setValidationTypes(constraint: FormatConstraint) {
    if (constraint.validationType && constraint.validationType !== this._previousConstrainFormValue.validationType) {
      this.currentValidationTypeSubtypes = getSubTypes(constraint.validationType)
    }

    if (constraint.validationSubType && constraint.validationSubType !== this._previousConstrainFormValue.validationSubType) {
      this.currentConstraintType = getConstraintType(constraint.validationType, constraint.validationSubType);
    }
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
