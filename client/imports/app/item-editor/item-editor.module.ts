import {ItemEditorComponent} from "./item-editor.component";
import {DndModule} from "ng2-dnd";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
/**
 * Created by a.nvlkv on 15/01/2017.
 */
@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DndModule
    ],
    declarations:[
        ItemEditorComponent
    ],
    bootstrap:[
        ItemEditorComponent
    ],
    exports:[
        ItemEditorComponent
    ]
})

export class ItemEditorModule{}