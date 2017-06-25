import {Component, Output, EventEmitter, Input, OnInit, OnChanges} from '@angular/core';
import template from './item-response.component.html';
import {FormGroup} from "@angular/forms";
import {ISingleSource, ISingleItemComposition} from "../../../../both/models/single-task-composition.model";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export interface ResponseOption{
    value: string | number | boolean;
    verbose: string;
}

@Component({
    selector: 'item-response',
    template
})

export class ItemResponseComponent implements OnInit, OnChanges{
    @Input() item: ISingleItemComposition;
    @Input() responseForm: FormGroup;
    @Output() submitCall: EventEmitter<null> = new EventEmitter<null>();
    @Output() resetCall: EventEmitter<null> = new EventEmitter<null>();

    responseOptions: ResponseOption[];

    ngOnInit(){
        // this.
    }

    ngOnChanges(changes){
        console.log(changes)
    }
}


