import { Component, OnInit } from '@angular/core';
import { GeneralDataService } from '../../api/general-data.service';
import { ResponseService } from '../../api/response.service';
import { ActivatedRoute } from '@angular/router';
import { Sequence } from 'models/Sequence';
import { Step } from '../../../models/Step';


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

  onAnswerSaved() {
    delete this.currentStep;
    this.rs.nextStep().subscribe(step => {
      this.currentStep = step;
    });
  }

}
