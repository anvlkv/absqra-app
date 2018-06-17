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
import { RespondentListsComponent } from './respondent-list-list/respondent-lists.component';
import { StepListComponent } from './step-list/step-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { LogicDetailComponent } from './logic-detail/logic-detail.component';
import { SequenceThumbnailComponent } from './sequence-thumbnail/sequence-thumbnail.component';
import { StepDetailComponent } from './step-detail/step-detail.component';
import { InputsModule } from '../inputs/inputs.module';
import { QuestionThumbnailComponent } from './question-thumbnail/question-thumbnail.component';
import { TaskThumbnailComponent } from './task-thumbnail/task-thumbnail.component';
import { LogicThumbnailComponent } from './logic-thumbnail/logic-thumbnail.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { AssetThumbnailComponent } from './asset-thumbnail/asset-thumbnail.component';
import { FormatConstraintsListComponent } from './format-constraints-list/format-constraints-list.component';
import { ProjectThumbnailComponent } from './project-thumbnail/project-thumbnail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SequenceDesignRoutingModule,
    AppCommonModule,
    InputsModule
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
    QuestionDetailComponent,
    TaskDetailComponent,
    LogicDetailComponent,
    SequenceThumbnailComponent,
    StepDetailComponent,
    QuestionThumbnailComponent,
    TaskThumbnailComponent,
    LogicThumbnailComponent,
    AssetDetailComponent,
    AssetThumbnailComponent,
    FormatConstraintsListComponent,
    ProjectThumbnailComponent
  ],
  providers: [

  ]
})
export class SequenceDesignModule { }
