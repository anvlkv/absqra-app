import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GeneralDataService } from './general-data.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { SequenceThumbnailComponent } from './sequence-thumbnail/sequence-thumbnail.component';
import { SequenceFormComponent } from './sequence-form/sequence-form.component';
import { ItemThumbnailComponent } from './item-thumbnail/item-thumbnail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AssetThumbnailComponent } from './asset-thumbnail/asset-thumbnail.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { StepDetailComponent } from './step-detail/step-detail.component';
import { StepThumbnailComponent } from './step-thumbnail/step-thumbnail.component';
import { LoadingStateComponent } from './loading-state/loading-state.component';
import { FormatConstraintThumbnailComponent } from './format-constraint-thumbnail/format-constraint-thumbnail.component';
import { FormatConstraintDetailComponent } from './format-constraint-detail/format-constraint-detail.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { FormatConstraintListComponent } from './format-constraint-list/format-constraint-list.component';
import { StepListComponent } from './step-list/step-list.component';
import { SortableListItemComponent } from './sortable-list-item/sortable-list-item.component';
import { SequenceDesignService } from './sequence-design.service';
import { SortByOrderPipe } from './sort-by-order.pipe';
import { SortableService } from './sortable.service';
import { SequenceAnswerComponent } from './sequence-answer/sequence-answer.component';
import { StepAnswerComponent } from './step-answer/step-answer.component';
import { ProgressComponent } from './progress/progress.component';
import { ResponseService } from './response.service';
import { StepInputComponent } from './step-input/step-input.component';
import { ListInputComponent } from './list-input/list-input.component';
import { AutoFocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SequenceListComponent,
    SequenceDetailComponent,
    SequenceThumbnailComponent,
    SequenceFormComponent,
    ItemThumbnailComponent,
    ItemDetailComponent,
    AssetThumbnailComponent,
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
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    GeneralDataService,
    SequenceDesignService,
    SortableService,
    ResponseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
