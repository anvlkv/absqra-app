import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Step } from '../../../models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step-executor',
  templateUrl: './step-executor.component.html',
  styleUrls: ['./step-executor.component.scss']
})
export class StepExecutorComponent extends BaseDetail<Step> implements OnInit {

  constructor(
    data: DataService,
    private route: ActivatedRoute
  ) {
    super(data);
    this.callConfigurator = (stepId, cause) => {
      switch (cause) {
        default: {
          return {
            route: CRUDRouter.entityStep,
            params: {stepId}
          }
        }
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(({stepId}) => {
      this.dataItemId = stepId;
      this.fetch();
    });
  }

}
