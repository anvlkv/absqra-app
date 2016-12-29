import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemResponseModule} from "./item-response/item-response.module";
import {SequenceResponseModule} from "./sequence-response/sequence-response.module";
import {PARTIALS_DECLARATIONS} from "./partials";

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
        //my modules
        ItemResponseModule,
        SequenceResponseModule
    ],
    declarations:[
        AppComponent,
        ...PARTIALS_DECLARATIONS
    ],
    bootstrap:[
        AppComponent
    ],
    exports:[
        RouterModule
    ]
})

export class AppModule{}