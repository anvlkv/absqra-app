import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SequenceExecutorComponent } from './sequence-executor/sequence-executor.component';
import { StepExecutorComponent } from './step-executor/step-executor.component';

const routes: Routes = [
  {
    path: ':sequenceId',
    component: SequenceExecutorComponent,
    children: [
      {
        path: ':stepId',
        component: StepExecutorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequenceResponseRoutingModule { }
