import {Route} from '@angular/router';
import {SequenceResponseComponent} from "./sequence-response/sequence-response.component";
import {SequenceEditorComponent} from "./sequence-editor/sequence-editor.component";
import {AppComponent} from "./app.component";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export const routes: Route[]=[
    {path:'', redirectTo: 'new/sequence', pathMatch: 'full'},
    {path:'response/:sequenceId/:itemId', component: SequenceResponseComponent},
    {path:'new/sequence', component: SequenceEditorComponent},
    {path:'edit/:sequenceId', component: SequenceEditorComponent}
];