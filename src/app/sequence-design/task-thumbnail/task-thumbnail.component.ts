import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../api-models';


@Component({
  selector: 'app-task-thumbnail',
  templateUrl: './task-thumbnail.component.html',
  styleUrls: ['./task-thumbnail.component.scss'],
})
export class TaskThumbnailComponent implements OnInit {
  @Input()
  task: Task;
  constructor() { }

  ngOnInit() {
  }

}
