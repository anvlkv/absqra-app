import {Component} from '@angular/core';
import template from './item-response-form-textarea.component.html';
import {ItemResponseFormInputComponent} from "./item-response-form-input.component";

/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response-form-textarea',
    template,
})

export class ItemResponseFormTextareaComponent extends ItemResponseFormInputComponent{}

