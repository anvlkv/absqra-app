import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceDesignRoutingModule } from './sequence-design-routing.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectThumbnailComponent } from './project-thumbnail/project-thumbnail.component';

@NgModule({
  imports: [
    CommonModule,
    SequenceDesignRoutingModule,
    AppCommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProjectsListComponent,
    ProjectThumbnailComponent
  ]
})
export class SequenceDesignModule { }
