import { Injectable } from '@angular/core';
import { Logic, Question, Sequence } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CallConfig } from 'models/call-config';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { DesignerRouter } from 'models/api-routes/DesignerRouter';

@Injectable({
  providedIn: 'root',
})
export class LogicDetailService extends BaseDetailService<Logic> {
  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(logicId: string, cause: CRUD, item?: Logic): CallConfig {
    switch (cause) {
      case CRUD.CREATE: {
        return {
          route: CRUDRouter.repoLogics,
        }
      }
      default: {
        return {
          route: CRUDRouter.entityLogic,
          params: {logicId}
        }
      }
    }
  }
}
