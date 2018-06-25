import { Component, Input, OnInit } from '@angular/core';
import { RespondentsList } from '../../../api-models';



@Component({
  selector: 'app-respondent-list-thumbnail',
  templateUrl: './respondent-list-thumbnail.component.html',
  styleUrls: ['./respondent-list-thumbnail.component.scss'],
})
export class RespondentListThumbnailComponent implements OnInit {
  @Input()
  respondentLists: RespondentsList;

  constructor() { }

  ngOnInit() {
  }

}
