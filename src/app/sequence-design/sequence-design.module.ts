import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceDesignRoutingModule } from './sequence-design-routing.module';
import { AppCommonModule } from '../app-common/app-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { RespondentListComponent } from './respondent-list/respondent-list.component';
import { ResponseListComponent } from './response-list/response-list.component';
import { RespondentListsComponent } from './respondent-list-list/respondent-lists.component';
import { RespondentListThumbnailComponent } from './respondent-list-thumbnail/respondent-list-thumbnail.component';
import { InputsModule } from '../inputs/inputs.module';
import { StepDetailComponent } from './step-detail/step-detail.component';
import { QuestionThumbnailComponent } from './question-thumbnail/question-thumbnail.component';
import { TaskThumbnailComponent } from './task-thumbnail/task-thumbnail.component';
import { LogicThumbnailComponent } from './logic-thumbnail/logic-thumbnail.component';
import { SequenceThumbnailComponent } from './sequence-thumbnail/sequence-thumbnail.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AssetThumbnailComponent } from './asset-thumbnail/asset-thumbnail.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { FormatConstraintDetailComponent } from './format-constraint-detail/format-constraint-detail.component';
import { FormatConstraintThumbnailComponent } from './format-constraint-thumbnail/format-constraint-thumbnail.component';
import { QuillModule } from 'ngx-quill';
import { StepThumbnailComponent } from './step-thumbnail/step-thumbnail.component';
import { SequenceService } from './sequence-detail/sequence.service';
import { StepService } from './step-detail/step.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SequenceDetailViewComponent } from './sequence-detail/sequence-detail-view.component';
import { LogicDetailComponent } from './logic-detail/logic-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SequenceDesignRoutingModule,
    AppCommonModule,
    ReactiveFormsModule,
    InputsModule,
    QuillModule
  ],
  declarations: [
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
    QuestionDetailComponent,
    AssetThumbnailComponent,
    AssetDetailComponent,
    FormatConstraintDetailComponent,
    FormatConstraintThumbnailComponent,
    StepThumbnailComponent,
    TaskDetailComponent,
    SequenceDetailViewComponent,
    LogicDetailComponent
  ],
  providers: [
    SequenceService,
    StepService
  ]
})
export class SequenceDesignModule { }
