import template from "./item-response-form-ordering.component.html";
import {Component, forwardRef, Input, OnChanges, OnInit} from "@angular/core";
import {ItemResponseFormInputComponent} from "./item-response-form-input.component";
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
/**
 * Created by a.nvlkv on 27/11/2016.
 */


@Component({
    selector: 'item-response-form-ordering',
    template,
    inputs:['assets'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ItemResponseFormOrderingComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ItemResponseFormOrderingComponent), multi: true }
    ]
})

export class ItemResponseFormOrderingComponent extends ItemResponseFormInputComponent implements ControlValueAccessor{
    sortedAssets:Array<any> = [];

    writeValue(val){
        this.sortedAssets = val;
    };

    registerOnTouched(){

    }

    registerOnChange(ch){
        console.log(ch, this);
    }

    // ngOnInit(){
    //     // console.log(this);
    //     this.unsortedAssets = this['assets'].slice();
    // }


    // writeValue(value: any) {
    //     this.sortedAssets = value;
    // }
    //
    // registerOnChange(e){
    //     // console.log(e);
    //     this.propagateChange=e;
    // }
    //
    // registerOnTouched(e){
    //     console.log(e);
    // }
}
