import { Injectable } from '@angular/core';
import { SequenceResponse } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CallConfig } from 'models/call-config';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseDetailService extends BaseDetailService<SequenceResponse> {
  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(sequenceResponseId: string, cause: CRUD, item?: SequenceResponse): CallConfig {
    switch (cause) {
      default: {
        return {
          route: CRUDRouter.entitySequenceResponse,
          params: {sequenceResponseId}
        }
      }
    }
  }
}
