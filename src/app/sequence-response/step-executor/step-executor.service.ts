import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Question, Step, Task } from 'models/api-models';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CallConfig } from 'models/call-config';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { RespondentRouter } from 'models/api-routes/RespondentRouter';

@Injectable({
  providedIn: 'root',
})
export class StepExecutorService extends BaseDetailService<Step> {

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(stepId: string, cause: CRUD, item?: Step): CallConfig {
    return {
      route: CRUDRouter.entityStep,
      params: {stepId}
    }
  }

}
