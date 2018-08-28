import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceDesignRoutingModule } from './sequence-design-routing.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectThumbnailComponent } from './project-thumbnail/project-thumbnail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { RespondentListComponent } from './respondent-list/respondent-list.component';
import { ResponseListComponent } from './response-list/response-list.component';
import { RespondentListsComponent } from './respondent-list-list/respondent-lists.component';
import { RespondentListThumbnailComponent } from './respondent-list-thumbnail/respondent-list-thumbnail.component';
import { InputsModule } from '../inputs/inputs.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { StepDetailComponent } from './step-detail/step-detail.component';
import { QuestionThumbnailComponent } from './question-thumbnail/question-thumbnail.component';
import { TaskThumbnailComponent } from './task-thumbnail/task-thumbnail.component';
import { LogicThumbnailComponent } from './logic-thumbnail/logic-thumbnail.component';
import { SequenceThumbnailComponent } from './sequence-thumbnail/sequence-thumbnail.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SequenceDesignRoutingModule,
    AppCommonModule,
    ReactiveFormsModule,
    InputsModule,
    DragScrollModule
  ],
  declarations: [
    ProjectsListComponent,
    ProjectThumbnailComponent,
    ProjectDetailComponent,
    SequenceDetailComponent,
    RespondentListComponent,
    ResponseListComponent,
    RespondentListThumbnailComponent,
    RespondentListsComponent,
    StepDetailComponent,
    QuestionThumbnailComponent,
    TaskThumbnailComponent,
    LogicThumbnailComponent,
    SequenceThumbnailComponent,
    QuestionDetailComponent
  ]
})
export class SequenceDesignModule { }
