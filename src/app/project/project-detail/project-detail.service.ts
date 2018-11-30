import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Project } from 'models/api-models/index';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CallConfig } from 'models/call-config';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService extends BaseDetailService<Project> {


  constructor(public api: ApiService) {
    super(api)
  }

  callConfigurator(projectId: string, cause: CRUD, item?: Project): CallConfig {
    switch (cause) {
      case CRUD.CREATE: {
        return {
          route: CRUDRouter.repoProjects
        }
      }
      default: {
        return {
          route: CRUDRouter.entityProject,
          params: {projectId}
        }
      }
    }
  }
}
