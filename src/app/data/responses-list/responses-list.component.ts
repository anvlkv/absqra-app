import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Project, SequenceResponse } from '../../../models/api-models';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { ProjectService } from '../../project/project.service';

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
    private data: DataService,
    private route: ActivatedRoute,
    private project: ProjectService
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
    this.responses = this.project.activeProject.asObservable().pipe(
      mergeMap(({id}) => {
        return this.data.getData<SequenceResponse[]>(CRUDRouter.repoSequenceResponsesOfProject, {projectId: id});
      }),
      tap(r => {
        this.$state.next(ComponentDynamicStates.VIEWING);
      })
    );
  }

}
