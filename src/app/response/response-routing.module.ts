import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SequenceComponent } from './sequence/sequence.component';

const routes: Routes = [
  {path: ':sequenceId', component: SequenceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseRoutingModule { }
