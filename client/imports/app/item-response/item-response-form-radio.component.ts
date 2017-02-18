import {Component} from '@angular/core';
import template from './item-response-form-radio.component.html';
import {ItemResponseFormInputComponent} from "./item-response-form-input.component";

/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response-form-radio',
    templateUrl: './item-response-form-radio.component.html',
    inputs:['choices']
})

export class ItemResponseFormRadioComponent extends ItemResponseFormInputComponent{}

