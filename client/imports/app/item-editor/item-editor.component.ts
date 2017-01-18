import {FormGroup} from "@angular/forms";
import {ISingleItemComposition} from "../../../../both/models/single-task-composition.model";
import {Input, Component} from "@angular/core";
import template from "./item-editor.component.html";
/**
 * Created by a.nvlkv on 15/01/2017.
 */
@Component({
    selector: 'item-editor',
    template
})

export class ItemEditorComponent {
    @Input() item: any;
    @Input() itemForm: FormGroup;
    constructor(){
        this.item={};
        this.item.name = 'Naam';
        this.item.description = 'lskdfjsljf'
    }
}