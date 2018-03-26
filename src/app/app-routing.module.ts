import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'old', loadChildren: 'app/old/old.module#OldModule'},
  {path: 'answer', loadChildren: 'app/response/response.module#ResponseModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
