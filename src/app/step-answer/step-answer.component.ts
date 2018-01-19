import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../models/step';

@Component({
  selector: 'app-step-answer',
  templateUrl: './step-answer.component.html',
  styleUrls: ['./step-answer.component.scss']
})
export class StepAnswerComponent implements OnInit {
  @Input() step: Step;

  response: any;

  constructor() { }

  ngOnInit() {
  }

  onResponse(e) {
    // console.log(e);
  }

  saveResponse(){
    console.log(this.response);
  }
}
