import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Project, Sequence } from '../../../api-models';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { DataService } from '../../app-common/data.service';
import { Observable, Subscription } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { BaseDetailOld } from '../../app-common/base-detail/base-detail-old';
import { CRUD } from '../../app-common/api.service';



@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends BaseDetailOld<Project> {
  projectState: Observable<DynamicState>;
  private projectIdSubscription: Subscription;

  constructor(
    data: DataService,
    route: ActivatedRoute
  ) {
    super(data);
    this.projectState = this.$state.asObservable();

    this.callConfigurator = (project, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoProjects
          }
        }
        default: {
          return {
            route: CRUDRouter.entityProject,
            params: { projectId: this.dataItemId }
          }
        }
      }
    };

    this.dataItemIdObservableSource = () => {
      return route.params.pipe(map(({projectId}) => projectId));
    };
  }

  save(form) {
    if (form.valid) {
      this.saveDataItem()
    }
  }

  editProject() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  onTopSequenceChange(topSequence: Sequence) {
    if (!this.dataItem.topSequenceId || this.dataItem.topSequenceId !== topSequence.id) {
      this.dataItem = {
        ...this.dataItem,
        topSequence
      };
      this.saveDataItem();
    }
  }
}
