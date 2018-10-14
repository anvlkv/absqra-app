import { Component } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Question, QuestionPresentationTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { RespondentRouter } from 'models/api-routes/RespondentRouter';


@Component({
  selector: 'app-question-executor',
  templateUrl: './question-executor.component.html',
  styleUrls: ['./question-executor.component.scss']
})
export class QuestionExecutorComponent extends BaseDetail<Question> {

  presentationTypes = QuestionPresentationTypes;

  constructor(
    data: DataService
  ) {
    super(data);
    this.callConfigurator = (executableQuestionId, cause) => {
      return {
        route: RespondentRouter.viewExecutableQuestion,
        params: {executableQuestionId}
      }
    }
  }
}
