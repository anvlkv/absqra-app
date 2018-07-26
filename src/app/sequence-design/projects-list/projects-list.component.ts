import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';
import { Project } from '../../../api-models';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  ComponentDynamicStates, DynamicState,
  ImmediateStateConfiguration,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineAll, delay } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Observable<Project[]>;
  projectForm: FormGroup;

  private $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  state: Observable<DynamicState>;
  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.state = this.$state.asObservable();
  }

  ngOnInit() {
    combineLatest(
      this.data.getData<Project[]>(CRUDRouter.repoProjects),
      this.data.getData<Project>(CRUDRouter.entityProject, {projectId: 0})
    ).pipe(
      catchError((err, obs) => {
        this.$state.next({state: ComponentDynamicStates.FAILING, err});
        return obs;
      })
    ).subscribe(([projects, defaultProject]) => {
      this.projectForm = this.fb.group(defaultProject);
      this.projects = of(projects);
      this.$state.next(ComponentDynamicStates.VIEWING);
    });
  }

  saveProject() {
    if (this.projectForm.valid) {
      this.data.postData<Project>(CRUDRouter.repoProjects, {}, this.projectForm.value).subscribe(project => {
        this.router.navigate([project.id], {relativeTo: this.route}).catch(err => this.$state.next({state: ComponentDynamicStates.FAILING, err}));
      })
    }
  }

}
