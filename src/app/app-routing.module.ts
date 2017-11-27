import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'ask', component: SequenceListComponent},
  {path: 'ask/:sequenceId', component: SequenceDetailComponent, children: [
    // {path: ':itemId'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
