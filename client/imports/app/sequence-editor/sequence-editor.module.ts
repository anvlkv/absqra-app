import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {BrowserModule} from "@angular/platform-browser";
import {SequenceEditorComponent} from "./sequence-editor.component";
import {RouterModule} from "@angular/router";

// import {SubmitControlComponent} from "./submit-control/submit-control.component";
import {ReactiveFormsModule} from "@angular/forms";
// import {ITEM_DECLARATIONS} from "../item-response";

/**
 * Created by a.nvlkv on 01/12/2016.
 */

@NgModule({
    imports:[
        BrowserModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations:[
        SequenceEditorComponent,
        // ...ITEM_DECLARATIONS,
        // SubmitControlComponent
    ],
    bootstrap:[
        SequenceEditorComponent
    ]
})

export class SequenceEditorModule{}