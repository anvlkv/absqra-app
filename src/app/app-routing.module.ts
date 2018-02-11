import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'old', loadChildren: 'app/old/old.module#OldModule'},
  {path: 'answer', loadChildren: 'app/workflows/response-workflow/response-workflow.module#ResponseWorkflowModule'},
  // {path: 'ask/:sequenceId', component: SequenceDetailComponent},
  // {path: 'answer/:sequenceId', component: SequenceAnswerComponent},
  // {path: 'answer/:sequenceId/:itemId', component: StepAnswerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
