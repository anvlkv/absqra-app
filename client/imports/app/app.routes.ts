import {Route} from '@angular/router';
import {SequenceResponseComponent} from "./sequence-response/sequence-response-component";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export const routes: Route[]=[
    {path:'response/:sequenceId/:taskId', component: SequenceResponseComponent}
];