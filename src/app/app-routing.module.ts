import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { SequenceAnswerComponent } from './sequence-answer/sequence-answer.component';
import { ItemAnswerComponent } from './item-answer/item-answer.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'ask', component: SequenceListComponent},
  {path: 'ask/:sequenceId', component: SequenceDetailComponent},
  {path: 'answer/:sequenceId', component: SequenceAnswerComponent},
  {path: 'answer/:sequenceId/:itemId', component: ItemAnswerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
