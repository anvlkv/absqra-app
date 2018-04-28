import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app-common/api.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../api-models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Observable<Project[]>;
  newProject: Partial<Project> = {};

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.projects = this.api.getData<Project[]>(CRUDRouter.getAllProjects);
  }

  createNewProject() {
    this.api.postData<Project>(CRUDRouter.newProject, null, this.newProject).subscribe(project => {
      console.log(project);
    });
  }

}
