import {Component, ContentChild, TemplateRef, Input, Output, EventEmitter} from "@angular/core";
import template from './list-input.component.html'
/**
 * Created by a.nvlkv on 19/02/2017.
 */

@Component({
    selector:'list-input',
    template
})

export class ListInputComponent{
    @ContentChild(TemplateRef)
    template: any;

    @Input()
    sortableData: any[] = [];

    @Input()
    inputsList: any[] = [];

    @Output()
    onItemRemoved: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onAddItemClick: EventEmitter<null> = new EventEmitter<null>();

    constructor(){
        // console.log(this.sortableData);
    }

    removeInputGroup(index){
        let removed = this.inputsList[index];
        this.inputsList.splice(index,1);
        if(this.sortableData.length>0){
            this.sortableData.splice(index, 1);
        }
        this.onItemRemoved.emit(removed);
    }

}