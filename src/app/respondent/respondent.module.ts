import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceResponseComponent } from './sequence-response/sequence-response.component';
import { ItemResponseComponent } from './item-response/item-response.component';
import {respondentRoutes} from './respondent.routes';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(respondentRoutes)
  ],
  declarations: [SequenceResponseComponent, ItemResponseComponent]
})
export class RespondentModule {
}
