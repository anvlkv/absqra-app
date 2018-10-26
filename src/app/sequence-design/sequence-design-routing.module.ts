import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';

const routes: Routes = [
  {
    path: ':sequenceId',
    component: SequenceDetailComponent
  },
  {
    path: ':sequenceId/:stepId',
    component: SequenceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequenceDesignRoutingModule { }
