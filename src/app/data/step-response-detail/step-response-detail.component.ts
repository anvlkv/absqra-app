import { Component } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { StepResponse } from 'models/api-models';
import { StepResponseDetailService } from './step-response-detail.service';

@Component({
  selector: 'app-step-response-detail',
  templateUrl: './step-response-detail.component.html',
  styleUrls: ['./step-response-detail.component.scss'],
  providers: [StepResponseDetailService]
})
export class StepResponseDetailComponent extends BaseDetail<StepResponse, StepResponseDetailService> {
  constructor(
    stepResponseService: StepResponseDetailService
  ) {
    super(stepResponseService);
  }
}
