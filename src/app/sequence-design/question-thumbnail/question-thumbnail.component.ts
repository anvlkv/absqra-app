import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { Question } from 'models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';
import { NgIfContext } from '@angular/common';



@Component({
  selector: 'app-question-thumbnail',
  templateUrl: './question-thumbnail.component.html',
  styleUrls: ['./question-thumbnail.component.scss'],
})
export class QuestionThumbnailComponent extends BaseThumbnail<Question> {
}
