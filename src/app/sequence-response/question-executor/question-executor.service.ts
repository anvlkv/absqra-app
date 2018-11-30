import { Injectable } from '@angular/core';
import { Question } from 'models/api-models';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CallConfig } from 'models/call-config';
import { RespondentRouter } from 'models/api-routes/RespondentRouter';
import { ResponseService } from '../sr/response.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionExecutorService extends BaseDetailService<Question> {

  constructor(
    public api: ApiService,
    private response: ResponseService
  ) {
    super(api);
  }

  callConfigurator(executableQuestionId: string, cause: CRUD, item?: Question): CallConfig {
    return {
      route: RespondentRouter.viewExecutableQuestion,
      params: {executableQuestionId, responseId: this.response.responseId}
    }
  }

}
