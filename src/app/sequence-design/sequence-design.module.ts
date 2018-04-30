import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceDesignRoutingModule } from './sequence-design-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../app-common/api.service';
import { AppCommonModule } from '../app-common/app-common.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { RespondentListComponent } from './respondent-list/respondent-list.component';
import { ResponseListComponent } from './response-list/response-list.component';
import { RespondentListThumbnailComponent } from './respondent-list-thumbnail/respondent-list-thumbnail.component';
import { RespondentListsComponent } from './respondent-lists/respondent-lists.component';
import { StepListComponent } from './step-list/step-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SequenceDesignRoutingModule,
    AppCommonModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    SequenceDetailComponent,
    RespondentListComponent,
    ResponseListComponent,
    RespondentListThumbnailComponent,
    RespondentListsComponent,
    StepListComponent,

  ],
  providers: [
  ]
})
export class SequenceDesignModule { }
