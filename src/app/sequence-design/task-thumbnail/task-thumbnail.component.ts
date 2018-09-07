import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';


@Component({
  selector: 'app-task-thumbnail',
  templateUrl: './task-thumbnail.component.html',
  styleUrls: ['./task-thumbnail.component.scss', '../styles/sequence-design.scss'],
})
export class TaskThumbnailComponent extends BaseThumbnail<Task> {
}
