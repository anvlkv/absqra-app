import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SequenceResponseComponent } from './sequence-response/sequence-response.component';
import { StepResponseComponent } from './step-response/step-response.component';
import { JustStepGuard } from './just-step.guard';
import { SequenceResolver } from './sequence.resolver';

const routes: Routes = [
  {path: ':sequenceId', component: SequenceResponseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseWorkflowRoutingModule { }
