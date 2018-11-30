import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Step, StepTypes } from 'models/api-models';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { StepExecutorService } from './step-executor.service';

@Component({
  selector: 'app-step-executor',
  templateUrl: './step-executor.component.html',
  styleUrls: ['./step-executor.component.scss'],
  providers: [StepExecutorService]
})
export class StepExecutorComponent extends BaseDetail<Step, StepExecutorService> implements OnInit {

  stepTypes = StepTypes;

  constructor(
    stepService: StepExecutorService,
    private route: ActivatedRoute
  ) {
    super(stepService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.dataItemId) {
      this.route.params.subscribe(({stepId}) => {
        this.dataItemId = stepId;
        this.dataItemService.fetch(this.dataItemId);
      });
    }
  }

}
