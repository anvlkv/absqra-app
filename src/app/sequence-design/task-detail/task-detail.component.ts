import { Component } from '@angular/core';
import { Task, TaskExecutorType } from 'models/api-models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';
import { TaskDetailService } from './task-detail.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../styles/sequence-design.scss'],
})
export class TaskDetailComponent extends BaseDetailForm<Task, TaskDetailService> {
  taskForm: FormGroup;
  taskExecutorOptions = unpackEnum(TaskExecutorType);

  constructor(
    taskService: TaskDetailService,
    fb: FormBuilder
  ) {
    super(taskService, fb);
  }

}
