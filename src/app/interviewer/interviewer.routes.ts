import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SequenceEditorComponent} from './sequence-editor/sequence-editor.component';
/**
 * Created by a.nvlkv on 12/07/2017.
 */

export const interviewerRoutes: Routes = [
  {path: 'ask', component: DashboardComponent, children: [
  ]},
  {path: 'ask/:sequenceId', component: SequenceEditorComponent},
  {path: 'ask/:sequenceId/:itemId', component: SequenceEditorComponent},
];
