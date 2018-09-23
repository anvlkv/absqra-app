import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceResponseRoutingModule } from './sequence-response-routing.module';
import { TopSequenceExecutorComponent } from './top-sequence-executor/top-sequence-executor.component';
import { StepExecutorComponent } from './step-executor/step-executor.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { QuestionExecutorComponent } from './question-executor/question-executor.component';
import { TaskExecutorComponent } from './task-executor/task-executor.component';
import { StaticContentComponent } from './static-content/static-content.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SequenceResponseRoutingModule,
  ],
  declarations: [
    TopSequenceExecutorComponent,
    StepExecutorComponent,
    QuestionExecutorComponent,
    TaskExecutorComponent,
    StaticContentComponent
  ]
})
export class SequenceResponseModule { }
