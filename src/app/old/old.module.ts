///<reference path="sequence-list/sequence-list.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from '../api/api.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { SequenceThumbnailComponent } from './sequence-thumbnail/sequence-thumbnail.component';
import { SequenceFormComponent } from './sequence-form/sequence-form.component';
import { ItemThumbnailComponent } from './item-thumbnail/item-thumbnail.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AssetThumbnailComponent } from './asset-thumbnail/asset-thumbnail.component';
import { StepDetailComponent } from 'app/old/step-detail/step-detail.component';
import { StepThumbnailComponent } from './step-thumbnail/step-thumbnail.component';
import { LoadingStateComponent } from './loading-state/loading-state.component';
import { FormatConstraintThumbnailComponent } from './format-constraint-thumbnail/format-constraint-thumbnail.component';
import { FormatConstraintDetailComponent } from 'app/old/format-constraint-detail/format-constraint-detail.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { FormatConstraintListComponent } from './format-constraint-list/format-constraint-list.component';
import { StepListComponent } from './step-list/step-list.component';
import { SortableListItemComponent } from 'app/old/sortable-list-item/sortable-list-item.component';
import { SortByOrderPipe } from './sort-by-order.pipe';
import { SequenceAnswerComponent } from './sequence-answer/sequence-answer.component';
import { StepAnswerComponent } from './step-answer/step-answer.component';
import { ProgressComponent } from './progress/progress.component';
import { StepInputComponent } from './step-input/step-input.component';
import { ListInputComponent } from './list-input/list-input.component';
import { AutoFocusDirective } from './autofocus.directive';
import { OldRoutingModule } from './old-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SortableService } from './sortable.service';


@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    OldRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SortableService
  ],
  declarations: [
    LandingPageComponent,
    SequenceListComponent,
    SequenceDetailComponent,
    SequenceThumbnailComponent,
    SequenceFormComponent,
    ItemThumbnailComponent,
    AssetThumbnailComponent,
    ItemDetailComponent,
    AssetDetailComponent,
    StepDetailComponent,
    StepThumbnailComponent,
    LoadingStateComponent,
    FormatConstraintThumbnailComponent,
    FormatConstraintDetailComponent,
    AssetListComponent,
    FormatConstraintListComponent,
    StepListComponent,
    SortableListItemComponent,
    SortByOrderPipe,
    SequenceAnswerComponent,
    StepAnswerComponent,
    ProgressComponent,
    StepInputComponent,
    ListInputComponent,
    AutoFocusDirective,
  ],
})
export class OldModule { }
