import { Component, Input, OnInit } from '@angular/core';
import { FormatConstraint } from '../../../models/FormatConstraint';

@Component({
  selector: 'app-format-constraint-thumbnail',
  templateUrl: './format-constraint-thumbnail.component.html',
  styleUrls: ['./format-constraint-thumbnail.component.scss']
})
export class FormatConstraintThumbnailComponent implements OnInit {
  @Input() formatConstraint: FormatConstraint;

  constructor() { }

  ngOnInit() {
  }

}
