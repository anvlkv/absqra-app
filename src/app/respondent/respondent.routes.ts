import {Routes} from '@angular/router';
import {SequenceResponseComponent} from './sequence-response/sequence-response.component';
import {ItemResponseComponent} from './item-response/item-response.component';
/**
 * Created by a.nvlkv on 12/07/2017.
 */
export const respondentRoutes: Routes = [
  {path: 'answer', component: SequenceResponseComponent, children: [
  ]},
  {path: 'answer/:sequenceId', component: SequenceResponseComponent},
  {path: 'answer/:sequenceId/:itemId', component: ItemResponseComponent}
];
