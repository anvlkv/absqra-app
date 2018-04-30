import { Component, Input, OnInit } from '@angular/core';
import { Sequence } from '../../../api-models';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss']
})
export class SequenceDetailComponent implements OnInit {
  @Input() sequence: Partial<Sequence>;

  constructor(
  ) { }

  ngOnInit() {
    if (!this.sequence) {
      this.sequence = {header: {name: 'new sequence'}, steps: []};
    }
  }

}
