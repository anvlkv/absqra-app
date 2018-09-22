import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';
import { Project } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  ComponentDynamicStates, DynamicState,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

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
      this.data.getData<Project>(CRUDRouter.entityProject, {projectId: 'default'})
    ).subscribe(([projects, defaultProject]) => {
      this.projectForm = this.fb.group(defaultProject);
      this.projects = of(projects);
      this.$state.next(ComponentDynamicStates.VIEWING);
    });
  }

  saveProject(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;

    if (this.projectForm.valid) {
      this.data.postData<Project>(CRUDRouter.repoProjects, {}, this.projectForm.value).subscribe(project => {
        this.router.navigate([project.id], {relativeTo: this.route}).catch(err => this.$state.next({state: ComponentDynamicStates.FAILING, err}));
      });
    }

    return false;
  }

}
