import {Component, OnInit} from '@angular/core';
import template from './item-response-form-checkbox.component.html';
import {ItemResponseFormInputComponent} from "./item-response-form-input.component";

/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response-form-checkbox',
    template,
    inputs:['choices']
})

export class ItemResponseFormCheckboxComponent extends ItemResponseFormInputComponent {}

