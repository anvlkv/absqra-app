import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../api-models';



@Component({
  selector: 'app-question-thumbnail',
  templateUrl: './question-thumbnail.component.html',
  styleUrls: ['./question-thumbnail.component.scss'],
})
export class QuestionThumbnailComponent implements OnInit {
  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {
  }

}
