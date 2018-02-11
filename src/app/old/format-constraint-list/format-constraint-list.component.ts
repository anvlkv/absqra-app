import { Component, Input, OnInit } from '@angular/core';
import { FormatConstraint } from '../../../models/FormatConstraint';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-format-constraint-list',
  templateUrl: './format-constraint-list.component.html',
  styleUrls: ['./format-constraint-list.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FormatConstraintListComponent implements OnInit {
  @Input() formatConstraints: FormatConstraint[];
  editing: {[id: number]: boolean} = {};

  constructor() { }

  ngOnInit() {

  }

  addedFormatConstraint(c: FormatConstraint) {
    this.editing[c.id] = true;
  }
}
