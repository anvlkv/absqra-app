import { Component, Input, OnInit } from '@angular/core';
import { Sequence } from '../../../models/Sequence';

@Component({
  selector: 'app-sequence-thumbnail',
  templateUrl: './sequence-thumbnail.component.html',
  styleUrls: ['./sequence-thumbnail.component.scss']
})
export class SequenceThumbnailComponent implements OnInit {
  @Input() sequence: Sequence;

  constructor() { }

  ngOnInit() {
  }

}
