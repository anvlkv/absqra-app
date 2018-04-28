import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  // {path: 'old', loadChildren: 'app/old/old.module#OldModule'},
  // {path: 'answer', loadChildren: 'app/response/response.module#ResponseModule'},
  {
    path: 'ask',
    loadChildren: 'app/sequence-design/sequence-design.module#SequenceDesignModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
