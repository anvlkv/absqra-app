import { Component, Input, OnInit } from '@angular/core';
import { Logic } from '../../../api-models';

@Component({
  selector: 'app-logic-thumbnail',
  templateUrl: './logic-thumbnail.component.html',
  styleUrls: ['./logic-thumbnail.component.scss']
})
export class LogicThumbnailComponent implements OnInit {
  @Input()
  logic: Logic;

  constructor() { }

  ngOnInit() {
  }

}
