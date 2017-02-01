import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {BrowserModule} from "@angular/platform-browser";
import {SequenceEditorComponent, ItemSortPipe} from "./sequence-editor.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemEditorModule} from "../item-editor/item-editor.module";
import {PARTIALS_DECLARATIONS} from "../partials";
import {InplaceEditSwitchComponent} from "../partials/inplace-edit-switch/inplace-edit-switch.component";

/**
 * Created by a.nvlkv on 01/12/2016.
 */

@NgModule({
    imports:[
        BrowserModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule,
        ItemEditorModule,

    ],
    declarations:[
        SequenceEditorComponent,
        InplaceEditSwitchComponent,
        ItemSortPipe
    ],
    bootstrap:[
        SequenceEditorComponent
    ]
})

export class SequenceEditorModule{}