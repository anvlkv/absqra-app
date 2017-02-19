import {Component, Input, Output, EventEmitter} from '@angular/core';
import template from './item-response-form-input.component.html';
import {FormGroup, FormControlName} from "@angular/forms";

/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response-form-input',
    template,
})

export class ItemResponseFormInputComponent {
    @Input() controlName: FormControlName;
    @Input() inputId: string;
    @Input() inputType: string;
    @Input() describedby: string;
    @Input() formGroup: FormGroup;
    @Output() submitCall: EventEmitter<null> = new EventEmitter<null>();
}

