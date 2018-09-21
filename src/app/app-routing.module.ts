import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ask',
    loadChildren: 'app/sequence-design/sequence-design.module#SequenceDesignModule',
  },
  {
    path: 'answer',
    loadChildren: 'app/sequence-response/sequence-response.module#SequenceResponseModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ask'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
