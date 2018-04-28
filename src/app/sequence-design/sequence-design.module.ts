import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceDesignRoutingModule } from './sequence-design-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../app-common/api.service';
import { AppCommonModule } from '../app-common/app-common.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SequenceDesignRoutingModule,
    AppCommonModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent
  ],
  providers: [
  ]
})
export class SequenceDesignModule { }
