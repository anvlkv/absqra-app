import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotKeysService } from '../../app-common/hot-keys-service/hot-keys.service';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api-service/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss' /*, '../styles/sequence-design.scss'*/]
})
export class ProjectDetailComponent extends BaseDetail<Project> implements OnInit, OnDestroy {
  projectForm: FormGroup;

  panning = true;

  constructor(
    data: DataService,
    el: ElementRef,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotkeys: HotKeysService,
  ) {
    super(data, el);
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
    });

  }

  saveProjectHeader(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;

    if (this.projectForm.valid) {
      this.update({...this.dataItem, ...this.projectForm.value})
    }
    return false;
  }

  onSequenceIdChange(id: number) {
    this.dataItem.topSequence = {id};
    this.update();
  }
}
