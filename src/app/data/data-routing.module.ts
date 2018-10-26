import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsesListComponent } from './responses-list/responses-list.component';
import { ResponseDetailComponent } from './response-detail/response-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ResponsesListComponent,
  },
  {
    path: ':sequenceResponseId',
    component: ResponseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
