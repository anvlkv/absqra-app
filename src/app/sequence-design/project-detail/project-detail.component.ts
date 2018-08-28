import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ActivatedRoute } from '@angular/router';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotKeysService } from '../../app-common/hot-keys.service';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends BaseDetail<Project> implements OnInit, OnDestroy {
  projectForm: FormGroup;

  panning = true;

  constructor(
    data: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotkeys: HotKeysService,
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
      this.id = projectId;
    });

    super.ngOnInit();

    this.hotkeys.on('space').subscribe(p => this.panning = p);

    this.itemSetObservable.subscribe((loaded) => {
      const project = loaded ? this.dataItem : this.defaultItem;
      this.projectForm = this.fb.group({name: project.name, description: project.description});
    });

  }

  saveProjectHeader() {
    if (this.projectForm.valid) {
      this.update({...this.dataItem, ...this.projectForm.value})
    }
  }

  onSequenceIdChange(id: number) {
    this.dataItem.topSequence = {id};
    this.update();
  }
}
