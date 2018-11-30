import { Injectable } from '@angular/core';
import { Step } from 'models/api-models';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CallConfig } from 'models/call-config';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';

@Injectable({
  providedIn: 'root'
})
export class StepDetailService extends BaseDetailService<Step> {
  public sequenceId: string;

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(stepId: string, cause: CRUD, item?: Step): CallConfig {
    switch (cause) {
      case CRUD.CREATE: {
        return {
          route: CRUDRouter.repoStepsOfSequence,
          params: {sequenceId: this.sequenceId}
        };
      }
      default: {
        return {
          route: CRUDRouter.entityStep,
          params: {stepId},
        };
      }
    }
  }

}
