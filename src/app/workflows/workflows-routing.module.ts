import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SequenceCrudComponent } from './sequence-crud/sequence-crud.component';

const routes: Routes = [
  {path: 'ask', component: SequenceCrudComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
