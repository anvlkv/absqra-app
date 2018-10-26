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
import { formDeltaValue, unpackEnum } from '../../utils';
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
        questionAssetsIds: this.fb.control(question.questionAssetsIds || []),
        responseAssetsIds: this.fb.control(question.responseAssetsIds || [])
      });

      this.questionForm.controls['formatConstraintsIds'].valueChanges.subscribe(ids => {
        if (ids.every(id => !!id)) {
          this.dataItem.formatConstraints = ids.map((id, i) => ({id, order: i}));
          this.update(this.dataItem);
        }
      });

      this.questionForm.controls['questionAssetsIds'].valueChanges.subscribe(ids => {
        if (ids.every(id => !!id)) {
          this.dataItem.questionAssets = ids.map((id, i) => ({id, order: i}));
          this.update(this.dataItem);
        }
      });

      this.questionForm.controls['responseAssetsIds'].valueChanges.subscribe(ids => {
        if (ids.every(id => !!id)) {
          this.dataItem.responseAssets = ids.map((id, i) => ({id, order: i}));
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
        this.update({...this.dataItem, ...formDeltaValue(this.questionForm)})
      }
      else {
        this.save({...this.dataItem, ...formDeltaValue(this.questionForm)});
      }
    }

    return false;
  }

  setQuestionContentId(id: string) {
    this.dataItem.contentAsset = {id};
    if (this.dataItemId) {
      this.update({...this.dataItem})
    }
  }
}
