import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseWorkflowRoutingModule } from './response-workflow-routing.module';
import { SequenceResponseComponent } from './sequence-response/sequence-response.component';
import { StepResponseComponent } from './step-response/step-response.component';
import { JustStepGuard } from './just-step.guard';
import { SequenceResolver } from './sequence.resolver';
import { CoreFormsModule } from '../../core-forms/core-forms.module';
import { CoreContentModule } from '../../core-content/core-content.module';
// import { ApiModule } from '../../api/api.module';

@NgModule({
  imports: [
    CommonModule,
    ResponseWorkflowRoutingModule,
    CoreFormsModule,
    CoreContentModule
  ],
  declarations: [
    SequenceResponseComponent,
    StepResponseComponent
  ],
  providers: [
    JustStepGuard,
    SequenceResolver
  ]
})
export class ResponseWorkflowModule { }
