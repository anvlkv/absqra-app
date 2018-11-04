import { Component, OnInit } from '@angular/core';
import { Project } from 'models/api-models/index';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import {
  ComponentDynamicStates, DynamicState,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { mergeMap } from 'rxjs/operators';
import { ApiService } from '../../app-common/api-service/api.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss' /*, '../styles/sequence-design.scss' */]
})
export class ProjectsListComponent implements OnInit {
  projects: Observable<Project[]>;
  projectForm: FormGroup;

  private $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  state: Observable<DynamicState>;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.state = this.$state.asObservable();
  }

  ngOnInit() {
    combineLatest(
      this.api.getData<Project[]>(CRUDRouter.repoProjects),
      this.api.getData<Project>(CRUDRouter.entityProject, {projectId: 'default'})
    ).subscribe(([projects, defaultProject]) => {
      this.projects = of(projects);
      this.projectForm = this.fb.group(defaultProject);
      this.$state.next(ComponentDynamicStates.VIEWING);
    });
  }

  saveProject(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;

    if (this.projectForm.valid) {
      this.api.postData<Project>(CRUDRouter.repoProjects, {}, this.projectForm.value).subscribe(project => {
        this.router.navigate([project.id], {relativeTo: this.route}).catch(err => this.$state.next({state: ComponentDynamicStates.FAILING, err}));
      });
    }

    return false;
  }

  deleteProject(projectId) {
    this.projects = this.api.deleteData(CRUDRouter.entityProject, {projectId}).pipe(
      mergeMap(() => {
        return this.api.getData<Project[]>(CRUDRouter.repoProjects);
      })
    );
  }

}
