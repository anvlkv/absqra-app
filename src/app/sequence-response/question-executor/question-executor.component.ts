import { Component } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { QuantityOrder, Question } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ViewRouter } from 'models/api-routes/ViewRouter';


@Component({
  selector: 'app-question-executor',
  templateUrl: './question-executor.component.html',
  styleUrls: ['./question-executor.component.scss']
})
export class QuestionExecutorComponent extends BaseDetail<Question> {

  constructor(
    data: DataService
  ) {
    super(data);
    this.callConfigurator = (executableQuestionId, cause) => {
      return {
        route: ViewRouter.viewExecutableQuestion,
        params: {executableQuestionId}
      }
    }
  }
}
