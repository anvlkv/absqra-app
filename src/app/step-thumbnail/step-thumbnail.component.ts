import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../models/step';
import { GeneralDataService, TypesMetaData } from '../general-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-step-thumbnail',
  templateUrl: './step-thumbnail.component.html',
  styleUrls: ['./step-thumbnail.component.scss']
})
export class StepThumbnailComponent implements OnInit {
  Step: Observable<Step>;
  step: Step = {};
  @Input() stepId: number;

  stepTypes: string[];


  constructor(
    private api: GeneralDataService
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.stepTypes = this.api.apiTypes['StepTypes'];

    if (!this.Step && this.stepId) {
      this.Step = this.api.getData('interviewerRoutes', 'getStep', {stepId: this.stepId});
    }

    if (this.Step) {
      this.Step.subscribe(s => this.step = s);
    }
  }



}
