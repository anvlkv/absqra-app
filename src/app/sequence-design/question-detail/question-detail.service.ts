import { Injectable } from '@angular/core';
import { Question, Sequence } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CallConfig } from 'models/call-config';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { DesignerRouter } from 'models/api-routes/DesignerRouter';

@Injectable({
  providedIn: 'root',
})
export class QuestionDetailService extends BaseDetailService<Question> {
  public projectId: string;

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(questionId: string, cause: CRUD, item?: Question): CallConfig {
    switch (cause) {
      case CRUD.CREATE: {
        return {
          route: CRUDRouter.repoQuestions
        };
      }
      default: {
        return {
          route: CRUDRouter.entityQuestion,
          params: {questionId}
        };
      }
    }
  }
}
