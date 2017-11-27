import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../models/step';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent implements OnInit {
  @Input() steps: Step[];
  editing: {[id: number]: boolean} = {};

  constructor() { }

  ngOnInit() {
  }

  stepAdded(step: Step) {
    this.editing[step.id] = true;
  }
}
