import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {ITEM_DECLARATIONS} from './item';

/**
 * Created by a.nvlkv on 19/11/2016.
 */


@NgModule({
    imports:[
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations:[
        AppComponent,
        ...ITEM_DECLARATIONS
    ],
    bootstrap:[
        AppComponent
    ]
})

export class AppModule{}