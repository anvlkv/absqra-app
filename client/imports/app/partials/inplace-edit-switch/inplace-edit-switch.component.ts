import {Component, Input, OnChanges, EventEmitter, Output, SimpleChanges} from '@angular/core';
import template from './inplace-edit-switch.component.html'

/**
 * Created by a.nvlkv on 15/01/2017.
 */

@Component({
    selector: 'inplace-edit-switch',
    template
})
export class InplaceEditSwitchComponent implements OnChanges{
    @Input() editState: boolean;
    @Output() editStateChanged = new EventEmitter<boolean>();

    ngOnChanges(changes: SimpleChanges){
        if(changes['editState'])
            this.editStateChanged.emit(changes['editState'].currentValue);
    }
    constructor(){
        this.editState = this.editState ? this.editState : false;
    }

}