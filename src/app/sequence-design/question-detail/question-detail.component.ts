import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { QuantityOrder, Question } from '../../../models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';
import { AssetPurposes } from '../asset-detail/asset-detail.component';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss', '../styles/sequence-design.scss']
})
export class QuestionDetailComponent extends BaseDetail<Question> implements OnInit {

  questionForm: FormGroup;
  qttOrder = unpackEnum(QuantityOrder);
  assetPurposeTypes = AssetPurposes;

  constructor(
    data: DataService,
    el: ElementRef,
    private fb: FormBuilder
  ) {
    super(data, el);
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
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const question = loaded ? this.dataItem : this.defaultItem;
      this.questionForm = this.fb.group({
        ...question,
        description: question.description || '',
        formatConstraintsIds: this.fb.control(question.formatConstraintsIds)
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

  setQuestionContentId(id: number) {
    this.dataItem.content = {id};
    if (this.dataItemId) {
      this.update({...this.dataItem})
    }
    else {
      this.save();
    }
  }
}
