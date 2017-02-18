import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {
    Input, Component, OnInit, NgZone, OnChanges, SimpleChanges
} from "@angular/core";
import template from "./item-editor.component.html";
import {MeteorObservable} from "meteor-rxjs";
import {Subscription} from "rxjs";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItem} from "../../../../both/models/single-item.model";
import { CustomValidators } from 'ng2-validation';
/**
 * Created by a.nvlkv on 15/01/2017.
 */

export interface IItemFormConfig{
    name?: string;
    value?: string;
    verbose?: string;
    tip?: string;
    type?: string;
    validators?: Validators[];
    fields?: IItemFormConfig[];
    options?: IItemFormConfig[];
}

@Component({
    selector: 'item-editor',
    templateUrl: "./item-editor.component.html"
})

export class ItemEditorComponent implements OnInit, OnChanges{
    @Input() itemId: string;
    itemSub: Subscription;
    item: ISingleItem;
    zone: NgZone;
    itemBaseFormGroup: FormGroup;
    itemDetailsFormGroup: FormGroup;
    itemTypeOptions: IItemFormConfig[];
    itemEditorIsActive: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
    ){
        this.zone = new NgZone({enableLongStackTrace: true});

        let sourceTypeConfig = {
            name: 'sourceType',
            verbose: 'Source type',
            type: 'select',
            options:[
                {
                    value: 'static',
                    verbose: 'Static value',
                    fields:[
                        {
                            name: 'value',
                            verbose: 'Value',
                            type: 'text',
                            validators: [Validators.required]
                        }
                    ]
                },
                {
                    value: 'dynamic',
                    verbose: 'Dynamic value',
                    fields:[
                        {
                            name:'valueSource',
                            verbose:'Value source',
                            type: 'select',
                            optionsRetriver: this.getSourceOptions
                        }
                    ]
                }
            ]
        }

        let optionConfigurators = {
            allowUndefined:{
                name:'allowUndefined',
                verbose:'Allow N/A',
                tip:'no answer',
                type:'checkbox'
            },
            allowOther:{
                name: 'allowOther',
                verbose: 'Allow other option...',
                tip:'adds input for custom option',
                type:'checkbox'
            },
            maxChar:{
                name:'maxChar',
                verbose:'Maximum characters',
                type:'number',
                validators: [CustomValidators.min(0), CustomValidators.gt(this.itemDetailsFormGroup.value.minChar || 0)]
            },
            minChar:{
                name:'minChar',
                verbose:'Minimum characters',
                type:'number',
                validators: [CustomValidators.min(0), CustomValidators.lt(this.itemDetailsFormGroup.value.maxChar || 0)]
            },
            maxCount:{
                name:'maxChar',
                verbose:'Maximum items count',
                type:'number',
                validators: [CustomValidators.min(0), CustomValidators.gt(this.itemDetailsFormGroup.value.minCount || 0)]
            },
            minCount:{
                name:'minChar',
                verbose:'Minimum items count',
                type:'number',
                validators: [CustomValidators.min(0), CustomValidators.lt(this.itemDetailsFormGroup.value.maxCount || 0)]
            },
            minVal:{
                name:'minVal',
                verbose:'Minimum value',
                type:'number',
                validators: [CustomValidators.lt(this.itemDetailsFormGroup.value.maxVal || 0)]
            },
            maxVal:{
                name:'maxVal',
                verbose:'Minimum value',
                type:'number',
                validators: [CustomValidators.gt(this.itemDetailsFormGroup.value.minVal || 0)]
            },
            minDate:{
                name:'minDate',
                verbose:'Earliest date',
                type:'date',
                validators: [CustomValidators.maxDate(this.itemDetailsFormGroup.value.maxDate)]
            },
            maxDate:{
                name:'maxDate',
                verbose:'Latest date',
                type:'date',
                validators: [CustomValidators.minDate(this.itemDetailsFormGroup.value.minDate)]
            },
            display:{
                name: 'display',
                verbose:'Display content',
                type: 'richText',
                tip: 'display formatted text with links and images'
            },
            options:{
                name: 'options',
                verbose: 'Response options',
                tip: 'e.g. how respondent can react on given stimuli',
                type: 'listing',
                fields:[
                    sourceTypeConfig
                ]
            },
            assets:{
                name: 'assets',
                verbose: 'Item assets',
                tip: 'stimuli provided to respondent',
                type: 'listing',
                fields:[
                    sourceTypeConfig
                ]
            }
        }

        this.itemTypeOptions=[
            {
                value:'yes-no',
                verbose:'Yes/No',
                fields:[
                    optionConfigurators.allowUndefined
                ]
            },
            {
                value:'input',
                verbose:'Single field',
                fields:[
                    {
                        name:'inputType',
                        verbose:'Field type',
                        type:'select',
                        options:[
                            {
                                value:'text',
                                verbose: 'Text',
                                fields:[
                                    optionConfigurators.minChar,
                                    optionConfigurators.maxChar
                                ]
                            },
                            {
                                value:'email',
                                verbose: 'Validated email',
                                fields:[
                                    optionConfigurators.allowUndefined,
                                ]
                            },
                            {
                                value:'url',
                                verbose: 'Validated url',
                                fields:[
                                    optionConfigurators.allowUndefined,
                                ]
                            },
                            {
                                value:'number',
                                verbose: 'Number',
                                fields:[
                                    optionConfigurators.minVal,
                                    optionConfigurators.maxVal
                                ]
                            },
                            {
                                value:'color',
                                verbose: 'Color',
                                fields:[
                                    optionConfigurators.allowUndefined,
                                ]
                            },
                            {
                                value:'date',
                                verbose: 'Date',
                                fields:[
                                    optionConfigurators.allowUndefined,
                                    optionConfigurators.minDate,
                                    optionConfigurators.maxDate,
                                ]
                            },
                            {
                                value:'time',
                                verbose: 'Time',
                                fields:[
                                    optionConfigurators.allowUndefined
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                value:'text',
                verbose:'Text',
                fields:[
                    optionConfigurators.minChar,
                    optionConfigurators.maxChar
                ]
            },
            {
                value:'single-choice',
                verbose:'Single choice',
                fields:[
                    optionConfigurators.allowOther,
                    optionConfigurators.allowUndefined
                ]
            },
            {
                value:'multiple-choice',
                verbose:'Multiple choice',
                fields:[
                    optionConfigurators.allowOther,
                    optionConfigurators.allowUndefined,
                    optionConfigurators.minCount,
                    optionConfigurators.maxCount
                ]
            },
            {
                value:'display',
                verbose:'Display',
                fields:[
                    optionConfigurators.display
                ]
            },
            {
                value:'listing',
                verbose:'List input',
                fields:[
                    optionConfigurators.minCount,
                    optionConfigurators.maxCount
                ]
            },
            {
                value:'rating',
                verbose:'Rating',
                fields:[
                    optionConfigurators.allowUndefined,
                    optionConfigurators.options,
                    optionConfigurators.assets,
                ]
            },
            {
                value:'ordering',
                verbose:'Drag-sorting',
                fields:[
                    optionConfigurators.assets,
                    optionConfigurators.minCount,
                    optionConfigurators.maxChar
                ]
            },
            {
                value:'grouping',
                verbose:'Grouping',
                fields:[
                    optionConfigurators.allowOther,
                    optionConfigurators.options,
                    optionConfigurators.assets
                ]
            }
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

    ngOnChanges(changes: SimpleChanges){
        console.log(changes);
    }



    getSourceOptions(){
        return null;
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