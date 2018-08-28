import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'old',
    loadChildren: 'app/sequence-design-old/sequence-design-old.module#SequenceDesignModuleOld',
  },
  {
    path: 'ask',
    loadChildren: 'app/sequence-design/sequence-design.module#SequenceDesignModule',
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
