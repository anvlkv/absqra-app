import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '../../../api/response.service';
import { Step } from '../../../../models/Step';

@Component({
  selector: 'app-step-response',
  templateUrl: './step-response.component.html',
  styleUrls: ['./step-response.component.scss']
})
export class StepResponseComponent implements OnInit {
  step: Step;

  constructor(
    private response: ResponseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(({stepId}) => {
    // });
    this.response.getStep().subscribe(s => this.step = s);
  }

  // nextStep() {
  //   this.response.nextStep();
  // }

}
