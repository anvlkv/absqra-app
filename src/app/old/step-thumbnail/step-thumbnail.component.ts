import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../../models/step';
import { GeneralDataService, TypesMetaData } from '../../api/general-data.service';
import { Observable } from 'rxjs/Observable';
import { SequenceDesignService } from '../../api/sequence-design.service';

@Component({
  selector: 'app-step-thumbnail',
  templateUrl: './step-thumbnail.component.html',
  styleUrls: ['./step-thumbnail.component.scss']
})
export class StepThumbnailComponent implements OnInit {
  step: Step;
  @Input() stepId: number;

  stepTypes: string[];


  constructor(
    private api: GeneralDataService,
    private sequenceDesign: SequenceDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.stepTypes = this.api.apiTypes['StepTypes'];

    if (this.stepId) {
      this.sequenceDesign.getStep(this.stepId).subscribe(step => {
        this.step = step;
      });
    }
  }



}
