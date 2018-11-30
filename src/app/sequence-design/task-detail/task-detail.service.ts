import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Step, Task } from 'models/api-models';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CallConfig } from 'models/call-config';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailService extends BaseDetailService<Task> {
  public sequenceId: string;

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(taskId: string, cause: CRUD, item?: Task): CallConfig {
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
  }

}
