import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app-common/data.service';
import { Project } from '../../../api-models';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/index';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';

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
    private fb: FormBuilder
  ) {
    this.state = this.$state.asObservable();
  }

  ngOnInit() {
    this.projects = this.data.getData<Project[]>(CRUDRouter.getAllProjects);
    this.data.getData<Project>(CRUDRouter.getProject, {projectId: 0}).subscribe(defaultProject => {
      this.projectForm = this.fb.group(defaultProject);
      this.$state.next(ComponentDynamicStates.VIEWING);
    });
  }

  saveProject() {
    console.log(this.projectForm);
    // this.data.postData<Project>()
  }

}
