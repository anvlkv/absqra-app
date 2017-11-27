import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatConstraint } from '../../models/formatConstraint';

@Component({
  selector: 'app-format-constraint-detail',
  templateUrl: './format-constraint-detail.component.html',
  styleUrls: ['./format-constraint-detail.component.scss']
})
export class FormatConstraintDetailComponent implements OnInit {
  @Input() formatConstraint: FormatConstraint;
  @Output() doneEditing: EventEmitter<FormatConstraint> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addConstraint() {

  }
}
