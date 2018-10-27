import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Task, TaskExecutorType } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../styles/sequence-design.scss'],
})
export class TaskDetailComponent extends BaseDetail<Task> implements OnInit {
  taskForm: FormGroup;
  taskExecutorOptions = unpackEnum(TaskExecutorType);

  constructor(
    data: DataService,
    private fb: FormBuilder
  ) {
    super(data);
    this.callConfigurator = (taskId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoTasks
          }
        }
        default: {
          return {
            route: CRUDRouter.entityTask,
            params: {taskId}
          }
        }
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const task = loaded ? this.dataItem : this.defaultItem;
      this.taskForm = this.fb.group({
        ...task
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
      }
    });
  }

  saveTask() {
    if (this.taskForm.valid) {
      this.save(this.taskForm.value)
    }
  }

}
