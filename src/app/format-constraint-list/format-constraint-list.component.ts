import { Component, Input, OnInit } from '@angular/core';
import { FormatConstraint } from '../../models/formatConstraint';

@Component({
  selector: 'app-format-constraint-list',
  templateUrl: './format-constraint-list.component.html',
  styleUrls: ['./format-constraint-list.component.scss']
})
export class FormatConstraintListComponent implements OnInit {
  @Input() formatConstraints: FormatConstraint[];
  editing: {[id: number]: boolean} = {};

  constructor() { }

  ngOnInit() {

  }

}
