import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'models/api-models/index';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotKeysService } from '../../app-common/hot-keys-service/hot-keys.service';
import { ApiService } from '../../app-common/api-service/api.service';
import { ProjectDetailService } from './project-detail.service';
import { DataOpRouter } from 'models/api-routes/DataOpRouter';
import { SequenceDetailCRouteReservedParam } from 'models/reservedRouteParams';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss' /*, '../styles/sequence-design.scss'*/],
  providers: [ProjectDetailService]
})
export class ProjectDetailComponent extends BaseDetailForm<Project, ProjectDetailService> implements OnInit, OnDestroy {

  projectForm: FormGroup;

  sequenceDetailRouteParams = SequenceDetailCRouteReservedParam;
  panning = true;

  constructor(
    projectService: ProjectDetailService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private hotkeys: HotKeysService,
    private api: ApiService
  ) {
    super(projectService, fb);
  }

  ngOnInit() {
    this.route.params.subscribe(({projectId}) => {
      this.dataItemId = projectId;
      this.dataItemService.fetch(this.dataItemId);
    });

    super.ngOnInit();

    this.hotkeys.on('space').subscribe(p => this.panning = p);
  }

  download() {
    this.api.download(DataOpRouter.entityProject, {
      projectId: this.dataItemId,
      operationType: 'download'
    });
  }
}
