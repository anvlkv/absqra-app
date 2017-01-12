import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SequenceResponseModule} from "./sequence-response/sequence-response.module";
import {PARTIALS_DECLARATIONS} from "./partials";
import {DndModule} from "ng2-dnd";
import {SequenceEditorModule} from "./sequence-editor/sequence-editor.module";
import {SequenceEditorComponent} from "./sequence-editor/sequence-editor.component";

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
        SequenceResponseModule,
        SequenceEditorModule
    ],
    declarations:[
        AppComponent,
        ...PARTIALS_DECLARATIONS
    ],
    bootstrap:[
        AppComponent
    ],
    exports:[
        RouterModule,
        DndModule,
        NgbModule
    ]
})

export class AppModule{}

console.log(routes);