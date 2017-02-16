import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DndModule} from "ng2-dnd";
import {PARTIALS_DECLARATIONS} from "./partials";
import {SequenceResponseComponent} from "./sequence-response/sequence-response.component";
import {SequenceEditorComponent, ItemSortPipe} from "./sequence-editor/sequence-editor.component";
import {ItemEditorComponent} from "./item-editor/item-editor.component";
import {ItemResponseModule} from "./item-response/item-response.module";

/**
 * Created by a.nvlkv on 19/11/2016.
 */


@NgModule({
    imports:[
        //libs
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        DndModule.forRoot(),
        //my modules
        ItemResponseModule
    ],
    declarations:[
        AppComponent,
        ...PARTIALS_DECLARATIONS,
        SequenceResponseComponent,
        SequenceEditorComponent,
        ItemSortPipe,
        ItemEditorComponent
    ],
    bootstrap:[
        AppComponent,
    ],
    exports:[
        RouterModule,
        DndModule,
        NgbModule
    ]
})

export class AppModule{}