import { Routes } from '@angular/router';
import { ItemResponseComponent } from './item-response/item-response.component';
import { SequenceResponseComponent } from './sequence-response/sequence-response.component';
import { StartSequenceComponent } from './start-sequence/start-sequence.component';
/**
 * Created by a.nvlkv on 12/07/2017.
 */
export const respondentRoutes: Routes = [
  {
    path: 'answer', component: SequenceResponseComponent, children: []
  },
  {
    path: 'answer/:sequenceId', component: SequenceResponseComponent, children: [
    {path: '', component: StartSequenceComponent},
    {path: ':itemId', component: ItemResponseComponent}
  ]
  }
];
