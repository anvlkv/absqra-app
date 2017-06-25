import {ItemResponseFormInputComponent} from "./item-response-form-input.component";
import template from "./item-response-form-listing.component.html";
import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";

/**
 * Created by a.nvlkv on 27/11/2016.
 */



export interface listItem {
    order: number,
    value: string,
    controlName: string,
}

@Component({
    selector: 'item-response-form-listing',
    template,
    inputs:['assets']
})

export class ItemResponseFormListingComponent extends ItemResponseFormInputComponent implements OnInit{
    public listItems: listItem[] = [];

    constructor(
        private formBuilder: FormBuilder,
    ){
        super();
    }

    ngOnInit(){
        let item:listItem = {
            order:1,
            value:'',
            controlName: 'listItem_1'
        };

        this.listItems.push(item);
        this.formGroup.addControl(item.controlName, this.formBuilder.control(item.value));
    }

    addSiblingListItem(e){
        let order = this.listItems.length + 1;
        let item:listItem = {
            order: order,
            value:'',
            controlName: 'listItem_' + order
        };

        this.listItems.push(item);
        this.formGroup.addControl(item.controlName, this.formBuilder.control(item.value));

        e.preventDefault();
    }
}