import {Component} from '@angular/core';
import template from './item-response-form-rating.component.html';
import {ItemResponseFormInputComponent} from "./item-response-form-input.component";

/**
 * Created by anvlkv on 25/04/2017.
 */

@Component({
    selector: 'item-response-form-rating',
    template,
    inputs:['assets', 'options']
})

export class ItemResponseFormRatingComponent extends ItemResponseFormInputComponent{}


