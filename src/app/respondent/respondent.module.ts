import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemResponseComponent } from './item-response/item-response.component';
import { ProgressComponent } from './progress/progress.component';
import { respondentRoutes } from './respondent.routes';
import { SequenceResponseComponent } from './sequence-response/sequence-response.component';
import { StartSequenceComponent } from './start-sequence/start-sequence.component';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';
import { ResponseService } from './response.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(respondentRoutes),
    InputsModule
  ],
  declarations: [
    SequenceResponseComponent,
    ItemResponseComponent,
    ProgressComponent,
    StartSequenceComponent
  ],
  providers: [
    ResponseService
  ]
})
export class RespondentModule {
}
