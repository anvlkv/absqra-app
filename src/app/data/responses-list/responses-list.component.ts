import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SequenceResponse } from 'models/api-models';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { ProjectDetailService } from '../../project/project-detail/project-detail.service';
import { ApiService } from '../../app-common/api-service/api.service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.scss']
})
export class ResponsesListComponent implements OnInit {
  responses: Observable<SequenceResponse[]>;

  private $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  state: Observable<DynamicState>;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private project: ProjectDetailService
  ) {
    this.state = this.$state.asObservable();
  }

  ngOnInit() {
    // combineLatest(
    //   this.data.getData<Project[]>(CRUDRouter.repoProjects),
    //   this.data.getData<Project>(CRUDRouter.entityProject, {projectId: 'default'})
    // ).subscribe(([projects, defaultProject]) => {
    //   this.projectForm = this.fb.group(defaultProject);
    //   this.projects = of(projects);
    //   this.$state.next(ComponentDynamicStates.VIEWING);
    // });
    this.responses = this.project.dataItemObservable.pipe(
      mergeMap(({id}) => {
        return this.api.getData<SequenceResponse[]>(CRUDRouter.repoSequenceResponsesOfProject, {projectId: id});
      })
    );
  }

}
