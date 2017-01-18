import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {BrowserModule} from "@angular/platform-browser";
import {SequenceResponseComponent} from "./sequence-response.component";
import {RouterModule} from "@angular/router";
// import {ITEM_DECLARATIONS} from "../item-response";
import {SubmitControlComponent} from "../partials/submit-control/submit-control.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemResponseModule} from "../item-response/item-response.module";

/**
 * Created by a.nvlkv on 01/12/2016.
 */

@NgModule({
    imports:[
        BrowserModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule,
        ItemResponseModule
    ],
    declarations:[
        SequenceResponseComponent,
        SubmitControlComponent

    ],
    bootstrap:[
        SequenceResponseComponent
    ]
})

export class SequenceResponseModule{}