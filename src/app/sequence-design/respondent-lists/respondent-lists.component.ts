import { Component, Input, OnInit } from '@angular/core';
import { RespondentsList } from '../../../api-models';

@Component({
  selector: 'app-respondent-list-list',
  templateUrl: './respondent-lists.component.html',
  styleUrls: ['./respondent-lists.component.scss']
})
export class RespondentListsComponent implements OnInit {
  @Input() lists: Partial<RespondentsList>[];
  constructor() { }

  ngOnInit() {
  }

}
