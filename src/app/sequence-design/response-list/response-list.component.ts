import { Component, Input, OnInit } from '@angular/core';
import { SequenceResponse } from '../../../api-models';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {
  @Input() responses: Partial<SequenceResponse>[];

  constructor() { }

  ngOnInit() {
  }

}
