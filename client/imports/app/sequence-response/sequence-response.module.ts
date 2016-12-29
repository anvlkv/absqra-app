import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {SequenceResponseComponent} from "./sequence-response-component";
import {ItemResponseModule} from "../item-response/item-response.module";
import {RouterModule} from "@angular/router";

/**
 * Created by a.nvlkv on 01/12/2016.
 */

@NgModule({
    imports:[
        BrowserModule,
        ItemResponseModule,
    ],
    declarations:[
        SequenceResponseComponent
    ],
    bootstrap:[
        SequenceResponseComponent
    ]
})

export class SequenceResponseModule{}