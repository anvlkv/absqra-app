import { Component, Input, OnInit } from '@angular/core';
import { SequenceResponse } from '../../../models/api-models';


@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss', '../styles/sequence-design.scss']
})
export class ResponseListComponent implements OnInit {
  @Input()
  responses: SequenceResponse[];

  constructor() { }

  ngOnInit() {
  }

}
