import { Injectable } from '@angular/core';
import { Sequence } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CallConfig } from 'models/call-config';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { DesignerRouter } from '../../../models/api-routes/DesignerRouter';

@Injectable({
  providedIn: 'root',
})
export class SequenceService extends BaseDetailService<Sequence> {
  public projectId: string;

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(sequenceId: string, cause: CRUD, item?: Sequence): CallConfig {
    switch (cause) {
      case CRUD.CREATE: {
        if (this.projectId) {
          return {
            route: DesignerRouter.saveTopSequenceOfProject,
            params: { projectId: this.projectId }
          }
        }
        else {
          return {
            route: CRUDRouter.repoSequences
          }
        }
      }
      default: {
        return {
          route: CRUDRouter.entitySequence,
          params: {sequenceId}
        }
      }
    }
  }
}
