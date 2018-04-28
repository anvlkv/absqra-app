import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../app-common/api.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Project } from '../../../api-models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({projectId}) => {
      this.api.getData<Project>(CRUDRouter.getProject, {projectId}).subscribe(p => this.project = p);
    })
  }

}
