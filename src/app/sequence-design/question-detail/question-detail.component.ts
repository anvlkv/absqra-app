import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Question } from '../../../api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUD } from '../../app-common/api.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent extends BaseDetail<Question> implements OnInit {

  questionForm: FormGroup;

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
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const question = loaded ? this.dataItem : this.defaultItem;
      this.questionForm = this.fb.group({
        ...question,
        description: null
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
      }
    });
  }

  saveQuestionHeader() {
    if (this.questionForm.valid) {
      if (this.id) {
        this.update({...this.dataItem, ...this.questionForm.value})
      }
      else {
        this.save(this.questionForm.value);
      }
    }
  }
}
