import { Component, OnInit } from '@angular/core';
import { ApiService, CRUD } from '../../app-common/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { Project } from '../../../api-models';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { BaseList } from '../../app-common/base-list';
import { DataService } from '../../app-common/data-service/data.service';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { AddAt } from '../../inputs/array-input/array-input.component';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends BaseList<Project, null> implements OnInit{
  // projects: Observable<Project[]>;
  // newProject: Partial<Project> = {};

  addAt = AddAt;

  constructor(
    data: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(data);
    this.callConfigurator = () => { return {route: CRUDRouter.repoProjects} };

    this.archetypeRetriever = () => data.getData<Project>(CRUDRouter.entityProject, {projectId: null})
  }

  createNewProject(projectsInput, item: Project, i) {
    this.data.postData<Project>(CRUDRouter.repoProjects, null, item).subscribe(project => {
      // console.log(project);
      this.router.navigate([project.id], {relativeTo: this.route}).catch(e => this.$state.next(ComponentDynamicStates.FAILING));
    });
  }
}
