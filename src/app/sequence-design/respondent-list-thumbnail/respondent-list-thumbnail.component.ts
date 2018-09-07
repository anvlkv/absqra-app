import { Component, Input, OnInit } from '@angular/core';
import { RespondentsList } from '../../../models/api-models';



@Component({
  selector: 'app-respondent-list-thumbnail',
  templateUrl: './respondent-list-thumbnail.component.html',
  styleUrls: ['./respondent-list-thumbnail.component.scss', '../styles/sequence-design.scss'],
})
export class RespondentListThumbnailComponent implements OnInit {
  @Input()
  respondentLists: RespondentsList;

  constructor() { }

  ngOnInit() {
  }

}
