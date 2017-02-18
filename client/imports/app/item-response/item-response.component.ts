import { Component, Output, EventEmitter, Input } from '@angular/core';
import template from './item-response.component.html';
import {FormGroup} from "@angular/forms";
import {ISingleChoice, ISingleItemComposition} from "../../../../both/models/single-task-composition.model";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response',
    templateUrl: './item-response.component.html'
})

export class ItemResponseComponent {
    @Input() item: ISingleItemComposition;
    @Input() responseForm: FormGroup;
    @Output() submitCall: EventEmitter<null> = new EventEmitter<null>();
    @Output() resetCall: EventEmitter<null> = new EventEmitter<null>();
}


