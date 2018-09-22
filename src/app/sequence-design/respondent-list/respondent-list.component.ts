import { Component, Input, OnInit } from '@angular/core';
import { RespondentsList } from 'models/api-models';



@Component({
  selector: 'app-respondent-list',
  templateUrl: './respondent-list.component.html',
  styleUrls: ['./respondent-list.component.scss', '../styles/sequence-design.scss'],
})
export class RespondentListComponent implements OnInit {
  @Input()
  respondentLists: RespondentsList;

  constructor() { }

  ngOnInit() {
  }

}
