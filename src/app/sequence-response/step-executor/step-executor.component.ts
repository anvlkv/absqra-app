import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { Step, StepTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { BaseDetail } from '../../app-common/base-detail/base-detail';

@Component({
  selector: 'app-step-executor',
  templateUrl: './step-executor.component.html',
  styleUrls: ['./step-executor.component.scss']
})
export class StepExecutorComponent extends BaseDetail<Step> implements OnInit {

  stepTypes = StepTypes;

  constructor(
    data: DataService,
    private route: ActivatedRoute
  ) {
    super(data, false);
    this.callConfigurator = (stepId, cause) => {
      return {
        route: CRUDRouter.entityStep,
        params: {stepId}
      };
    }
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.dataItemId) {
      this.route.params.subscribe(({stepId}) => {
        this.dataItemId = stepId;
        this.fetch();
      });
    }
  }

}
