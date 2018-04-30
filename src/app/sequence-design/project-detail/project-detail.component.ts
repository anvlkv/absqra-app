import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from '../../app-common/api.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Project } from '../../../api-models/project';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project;
  projectSubscription: Subscription;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.projectSubscription = this.route.params.mergeMap(({projectId}) => {
       return this.api.getData<Project>(CRUDRouter.getProject, {projectId});
    }).subscribe(p => this.project = p);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  onPlaceholded(e, d) {
    console.log(e, d);
  }

}
