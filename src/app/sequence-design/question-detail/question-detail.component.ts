import { Component, ElementRef, OnInit } from '@angular/core';
import { QuantityOrder, Question } from 'models/api-models';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  DynamicState,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';
import { Observable } from 'rxjs';
import { FormatConstraintPurposes } from '../format-constraint-detail/format-constraint-detail.service';
import { QuestionDetailService } from './question-detail.service';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';
import { AssetPurposes } from '../asset-detail/asset-detail.service';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [QuestionDetailService]
})
export class QuestionDetailComponent extends BaseDetailForm<Question, QuestionDetailService> implements OnInit {
  qttOrderOptions = unpackEnum(QuantityOrder);
  qttOrder = QuantityOrder;
  assetPurposeTypes = AssetPurposes;
  formatConstraintPurposes = FormatConstraintPurposes;

  questionForm: FormGroup;
  contentState: Observable<DynamicState>;



  constructor(
    questionService: QuestionDetailService,
    fb: FormBuilder
  ) {
    super(questionService, fb);
  }
}
