import { Component, Input, OnInit } from '@angular/core';
import { Logic } from '../../../api-models';


@Component({
  selector: 'app-logic-detail',
  templateUrl: './logic-detail.component.html',
  styleUrls: ['./logic-detail.component.scss'],
})
export class LogicDetailComponent implements OnInit {
  @Input()
  logic: Logic;

  constructor() { }

  ngOnInit() {
  }

}
