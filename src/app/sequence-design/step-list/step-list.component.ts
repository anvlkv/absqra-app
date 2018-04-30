import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../../api-models';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent implements OnInit {

  @Input() steps: Partial<Step>[];

  constructor() { }

  ngOnInit() {
  }

}
