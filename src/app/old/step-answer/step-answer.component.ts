import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from '../../../models/Step';
import { ResponseService } from '../../api/response.service';

@Component({
  selector: 'app-step-answer',
  templateUrl: './step-answer.component.html',
  styleUrls: ['./step-answer.component.scss']
})
export class StepAnswerComponent implements OnInit {
  @Input() step: Step;
  @Output() answerSaved: EventEmitter<any> = new EventEmitter();
  response: any;

  constructor(
    private rs: ResponseService
  ) { }

  ngOnInit() {
    this.response = [];
  }

  onResponse(e) {
    // console.log(e);
  }

  saveResponse() {
    // console.log(this.response);
    this.rs.saveStepResponse(this.response).subscribe(r => {
      // console.log(r);
      this.answerSaved.emit(r);
    });
  }
}
