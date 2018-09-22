import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopSequenceExecutorComponent } from './top-sequence-executor/top-sequence-executor.component';
import { StepExecutorComponent } from './step-executor/step-executor.component';

const routes: Routes = [
  {
    path: ':sequenceId',
    component: TopSequenceExecutorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequenceResponseRoutingModule { }
