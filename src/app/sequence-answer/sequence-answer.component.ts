import { Component, OnInit } from '@angular/core';
import { GeneralDataService } from '../general-data.service';
import { ResponseService } from '../response.service';
import { ActivatedRoute } from '@angular/router';
import { Sequence } from 'models/sequence';
import { Step } from '../../models/step';


@Component({
  selector: 'app-sequence-answer',
  templateUrl: './sequence-answer.component.html',
  styleUrls: ['./sequence-answer.component.scss'],
})
export class SequenceAnswerComponent implements OnInit {
  sequence: Sequence;
  currentStep: Step;

  constructor(
    private api: GeneralDataService,
    private rs: ResponseService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.api.ready;
    this.route.params.subscribe(({sequenceId, itemId}) => {
      this.rs.set$sequence(sequenceId).subscribe(s => {
        this.sequence = s;
        this.rs.nextStep().subscribe(step => {
          this.currentStep = step;
        });
      });
    });
  }

  nextStep() {
    const currentIndex = this.sequence.steps.findIndex(step => this.currentStep.id == step.id);
    this.currentStep = this.sequence.steps
  }

}
