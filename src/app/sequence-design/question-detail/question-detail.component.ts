import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { QuantityOrder, Question } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import {
  ComponentDynamicStates,
  DynamicState,
  stateCombinator,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';
import { AssetPurposes } from '../asset-detail/asset-detail.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss', '../styles/sequence-design.scss']
})
export class QuestionDetailComponent extends BaseDetail<Question> implements OnInit {

  questionForm: FormGroup;
  qttOrder = unpackEnum(QuantityOrder);
  assetPurposeTypes = AssetPurposes;
  contentState: Observable<DynamicState>;

  constructor(
    data: DataService,
    private fb: FormBuilder
  ) {
    super(data);
    this.callConfigurator = (questionId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoQuestions
          }
        }
        default: {
          return {
            route: CRUDRouter.entityQuestion,
            params: {questionId}
          }
        }
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const question = loaded ? this.dataItem : this.defaultItem;
      this.questionForm = this.fb.group({
        ...question,
        description: question.description || '',
        formatConstraintsIds: this.fb.control(question.formatConstraintsIds || []),
        questionAssetsIds: this.fb.control(question.questionAssetsIds|| []),
        responseAssetsIds: this.fb.control(question.responseAssetsIds || [])
      });

      this.questionForm.valueChanges.subscribe(({formatConstraintsIds, questionAssetsIds, responseAssetsIds}) => {
        if (formatConstraintsIds.every(id => !!id)) {
          this.dataItem.formatConstraints = formatConstraintsIds.map((id, i) => ({id, order: i}));
        }
        if (questionAssetsIds.every(id => !!id)) {
          this.dataItem.questionAssets = questionAssetsIds.map((id, i) => ({id, order: i}));
        }
        if (responseAssetsIds.every(id => !!id)) {
          this.dataItem.responseAssets = responseAssetsIds.map((id, i) => ({id, order: i}));
        }

        if (formatConstraintsIds.every(id => !!id) ||
          questionAssetsIds.every(id => !!id) ||
          responseAssetsIds.every(id => !!id)
        ) {
          this.update(this.dataItem);
        }
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
      }
    });
  }

  saveQuestionHeader(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;
    if (this.questionForm.valid) {
      if (this.dataItemId) {
        this.update({...this.dataItem, ...this.questionForm.value})
      }
      else {
        this.save(this.questionForm.value);
      }
    }

    return false;
  }

  setQuestionContentId(id: string) {
    this.dataItem.contentAsset = {id};
    if (this.dataItemId) {
      this.update({...this.dataItem})
    }
    else {
      this.save();
    }
  }
}
