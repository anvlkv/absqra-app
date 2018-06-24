import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app-common/data.service';
import { Project } from '../../../api-models';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { ActivatedRoute, Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Observable<Project[]>;
  projectForm: FormGroup;

  private $state = new BehaviorSubject<ComponentDynamicStates>(ComponentDynamicStates.LOADING);
  state: Observable<ComponentDynamicStates>;
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
      this.data.getData<Project[]>(CRUDRouter.getAllProjects),
      this.data.getData<Project>(CRUDRouter.getProject, {projectId: 0})
    ).subscribe(([projects, defaultProject]) => {
      this.projectForm = this.fb.group(defaultProject);
      this.projects = of(projects);
      this.$state.next(ComponentDynamicStates.VIEWING);
    });
  }

  saveProject() {
    if (this.projectForm.valid) {
      this.data.postData<Project>(CRUDRouter.newProject, {}, this.projectForm.value).subscribe(project => {
        this.router.navigate([project.id], {relativeTo: this.route}).catch(e => this.$state.next(ComponentDynamicStates.FAILING));
      })
    }
  }

}
