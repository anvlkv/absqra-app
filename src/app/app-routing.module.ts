import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'ask',
    loadChildren: 'app/project/project.module#ProjectModule',
  },
  {
    path: 'answer',
    loadChildren: 'app/sequence-response/sequence-response.module#SequenceResponseModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ask'
  },
  {
    path: 'dev',
    loadChildren: 'app/dev-playground/dev-playground.module#DevPlaygroundModule'
  }
];

if (!environment.production) {
  // routes.push();
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
