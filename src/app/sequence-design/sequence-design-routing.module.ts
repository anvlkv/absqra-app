import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { SequenceDetailViewComponent } from './sequence-detail/sequence-detail-view.component';

const routes: Routes = [
  {
    path: ':sequenceId',
    component: SequenceDetailViewComponent
  },
  {
    path: ':sequenceId/:stepId',
    component: SequenceDetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequenceDesignRoutingModule { }
