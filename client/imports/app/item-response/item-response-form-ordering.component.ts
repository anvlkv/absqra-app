import template from "./item-response-form-ordering.component.html";
import {Component, OnInit} from "@angular/core";
import {ItemResponseFormInputComponent} from "./item-response-form-input.component";
/**
 * Created by a.nvlkv on 27/11/2016.
 */


@Component({
    selector: 'item-response-form-ordering',
    templateUrl: "./item-response-form-ordering.component.html",
    inputs:['choices']
})

export class ItemResponseFormOrderingComponent extends ItemResponseFormInputComponent implements OnInit{

    ngOnInit(){

    }
}