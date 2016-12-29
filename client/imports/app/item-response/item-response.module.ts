import {NgModule} from "@angular/core";
import {ITEM_DECLARATIONS} from "./";
import {ItemResponseComponent} from  "./item-response.component"
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

/**
 * Created by a.nvlkv on 29/11/2016.
 */


@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations:[
        ...ITEM_DECLARATIONS
    ],
    bootstrap:[
        ItemResponseComponent
    ],
    exports:[
        ...ITEM_DECLARATIONS
    ]
})

export class ItemResponseModule{}