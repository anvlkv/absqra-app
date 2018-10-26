import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { ResponseThumbnailComponent } from './response-thumbnail/response-thumbnail.component';
import { ResponseDetailComponent } from './response-detail/response-detail.component';
import { ResponsesListComponent } from './responses-list/responses-list.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { StepResponseDetailComponent } from './step-response-detail/step-response-detail.component';


@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule,
    AppCommonModule,
    NgxJsonViewerModule
  ],
  declarations: [
    ResponseThumbnailComponent,
    ResponseDetailComponent,
    ResponsesListComponent,
    StepResponseDetailComponent
  ]
})
export class DataModule { }
