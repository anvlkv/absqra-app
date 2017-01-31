import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Input, Component, OnInit, NgZone} from "@angular/core";
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

export class ItemEditorComponent implements OnInit{
    @Input() itemId: string;
    private itemSub: Subscription;
    private item: ISingleItem;
    private zone: NgZone;
    private itemBaseFormGroup: FormGroup;

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
            })
        })
    }

    constructor(
        private formBuilder: FormBuilder,
    ){
        this.zone = new NgZone({enableLongStackTrace: true});
    }
}