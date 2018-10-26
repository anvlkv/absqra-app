import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { SequenceResponse, StepResponse } from '../../../models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ApiService } from '../../app-common/api-service/api.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';

@Component({
  selector: 'app-step-response-detail',
  templateUrl: './step-response-detail.component.html',
  styleUrls: ['./step-response-detail.component.scss']
})
export class StepResponseDetailComponent extends BaseDetail<StepResponse> {
  constructor(
    data: DataService
  ) {
    super(data);
    this.callConfigurator = (stepResponseId, cause) => {
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
}
