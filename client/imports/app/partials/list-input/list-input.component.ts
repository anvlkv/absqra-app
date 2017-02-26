import {Component, ContentChild, TemplateRef, Input} from "@angular/core";
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

}