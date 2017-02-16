import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {
    Input, Component, OnInit, NgZone, Output, EventEmitter, AfterViewInit, ViewChildren,
    ChangeDetectorRef
} from "@angular/core";
import template from "./item-editor.component.html";
import {MeteorObservable} from "meteor-rxjs";
import {Subscription} from "rxjs";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItem} from "../../../../both/models/single-item.model";
/**
 * Created by a.nvlkv on 15/01/2017.
 */
@Component({
    selector: 'item-editor',
    template
})

export class ItemEditorComponent implements OnInit, AfterViewInit{
    @Input() itemId: string;
    private itemSub: Subscription;
    private item: ISingleItem;
    private zone: NgZone;
    private itemBaseFormGroup: FormGroup;
    private itemTypeOptions: {value: string; verbose: string}[];
    private itemEditorIsActive: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private _ch: ChangeDetectorRef
    ){
        this.zone = new NgZone({enableLongStackTrace: true});

        this.itemTypeOptions=[
            {
                value:'yes-no',
                verbose:'Yes/No'
            },
            {
                value:'input',
                verbose:'Single field'
            },
            {
                value:'text',
                verbose:'Text'
            },
            {
                value:'single-choice',
                verbose:'Single choice'
            },
            {
                value:'multiple-choice',
                verbose:'Multiple choice'
            },
            {
                value:'display',
                verbose:'Display'
            },
            {
                value:'listing',
                verbose:'List input'
            },
            {
                value:'ordering',
                verbose:'Drag-sorting'
            },
            {
                value:'grouping',
                verbose:'Grouping'
            },
        ]
    }

    ngOnInit(){
        this.itemSub = MeteorObservable.subscribe('author-per-item-subscription', this.itemId).subscribe(()=>{
            this.zone.run(()=>{
                this.item = Items.findOne(this.itemId);
                this.itemBaseFormGroup = this.formBuilder.group({
                    name: [this.item.name, Validators.required],
                    description: [this.item.description],
                    itemConfig: this.formBuilder.group({
                        itemType: [this.item.itemConfig ? this.item.itemConfig.itemType : '', Validators.required]
                    })
                });
                if(!this.item.name){
                    this.itemEditorIsActive = true;
                }
            })
        });
    }

    ngAfterViewInit(){

    }

    saveItemDescriptor(e){
        if(this.itemBaseFormGroup.valid){
            Items.update(this.itemId, this.itemBaseFormGroup.value).subscribe((resp)=>{
                if(resp){
                    this.itemEditorIsActive = false;
                }

            })
        }
    }

}