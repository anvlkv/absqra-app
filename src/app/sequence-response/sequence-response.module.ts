import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceResponseRoutingModule } from './sequence-response-routing.module';
import { SequenceExecutorComponent } from './sequence-executor/sequence-executor.component';
import { StepExecutorComponent } from './step-executor/step-executor.component';
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SequenceResponseRoutingModule,
  ],
  declarations: [
    SequenceExecutorComponent,
    StepExecutorComponent
  ]
})
export class SequenceResponseModule { }
