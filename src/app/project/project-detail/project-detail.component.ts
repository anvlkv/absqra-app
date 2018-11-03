import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'models/api-models/index';
import { DataService } from '../../app-common/data-service/data.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotKeysService } from '../../app-common/hot-keys-service/hot-keys.service';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api-service/api.service';
import { ProjectService } from '../project.service';
import { DataOpRouter } from 'models/api-routes/DataOpRouter';
import { SequenceDetailCRouteReservedParam } from 'models/reservedRouteParams';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss' /*, '../styles/sequence-design.scss'*/],
  providers: [ProjectService]
})
export class ProjectDetailComponent extends BaseDetail<Project> implements OnInit, OnDestroy {

  projectForm: FormGroup;

  sequenceDetailRouteParams = SequenceDetailCRouteReservedParam;
  panning = true;

  constructor(
    data: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotkeys: HotKeysService,
    private projectService: ProjectService
  ) {
    super(data);
    this.callConfigurator = (projectId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoProjects
          }
        }
        default: {
          return {
            route: CRUDRouter.entityProject,
            params: {projectId}
          }
        }
      }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(({projectId}) => {
      this.dataItemId = projectId;
    });

    super.ngOnInit();

    this.hotkeys.on('space').subscribe(p => this.panning = p);

    this.itemSetObservable.subscribe((loaded) => {
      const project = loaded ? this.dataItem : this.defaultItem;
      this.projectForm = this.fb.group({name: project.name, description: project.description});
      this.projectService.activeProject.next(project);
    });

  }

  saveProjectHeader(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;

    if (this.projectForm.valid && this.projectForm.dirty) {
      this.update({...this.dataItem, ...this.projectForm.value})
    }
    return false;
  }

  onSequenceIdChange(id: string) {
    this.dataItem.topSequence = {id};
    this.update();
  }

  download() {
    this.data.download(DataOpRouter.entityProject, {
      projectId: this.dataItemId,
      operationType: 'download'
    });
  }
}
