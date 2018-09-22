import { Component, Input, OnInit } from '@angular/core';
import { RespondentsList } from 'models/api-models';


@Component({
  selector: 'app-respondent-list-list',
  templateUrl: './respondent-lists.component.html',
  styleUrls: ['./respondent-lists.component.scss', '../styles/sequence-design.scss']
})
export class RespondentListsComponent implements OnInit {
  @Input()
  respondentsLists: RespondentsList[];
  constructor() { }

  ngOnInit() {
  }

}
