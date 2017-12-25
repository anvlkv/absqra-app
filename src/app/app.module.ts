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
    GeneralDataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
