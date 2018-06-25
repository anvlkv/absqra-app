import { Component, Input, OnInit } from '@angular/core';
import { QuantityOrder, Question } from '../../../api-models';
import { BaseDetail } from '../../app-common/base-detail';
import { DataService } from '../../app-common/data.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Observable } from 'rxjs/internal/Observable';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';
import { CRUD } from '../../app-common/api.service';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent extends BaseDetail<Question> implements OnInit {
  quantityOrders = QuantityOrder;
  quantityOrderList: string[];

  questionState: Observable<DynamicState>;
  constructor(
    data: DataService
  ) {
    super(data);
    this.quantityOrderList = unpackEnum(this.quantityOrders);
    this.questionState = this.$state.asObservable();

    this.callConfigurator = (question, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.newQuestion,
          };
        }
        case CRUD.READ: {
          return {
            route: CRUDRouter.getQuestion,
            params: {questionId: this.dataItemId},
          };
        }
        case CRUD.UPDATE: {
          return {
            route: CRUDRouter.saveQuestion,
            params: {questionId: this.dataItemId},
          };
        }
        case CRUD.DELETE: {
          return {
            route: CRUDRouter.deleteQuestion,
            params: {questionId: this.dataItemId},
          };
        }
      }
    };
  }

  save(form: NgForm) {
    if (form.valid) {
      this.saveDataItem();
    }
  }

  editQuestion() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  trackType(index: number, type: string) {
    return index;
  }
}
