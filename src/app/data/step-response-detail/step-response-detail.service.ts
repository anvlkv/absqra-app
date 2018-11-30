import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Project, StepResponse } from 'models/api-models/index';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CallConfig } from 'models/call-config';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';

@Injectable({
  providedIn: 'root'
})
export class StepResponseDetailService extends BaseDetailService<StepResponse> {


  constructor(public api: ApiService) {
    super(api)
  }

  callConfigurator(stepResponseId: string, cause: CRUD, item?: StepResponse): CallConfig {
    switch (cause) {
      default: {
        return {
          route: CRUDRouter.entityStepResponse,
          params: {stepResponseId}
        }
      }
    }
  }
}
