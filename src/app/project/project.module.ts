import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectThumbnailComponent } from './project-thumbnail/project-thumbnail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ProjectService } from './project.service';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    AppCommonModule,
    ReactiveFormsModule,
    DragScrollModule,
  ],
  declarations: [
    ProjectsListComponent,
    ProjectThumbnailComponent,
    ProjectDetailComponent,
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule { }
