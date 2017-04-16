import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";
import {
    Input, Component, OnInit, NgZone, OnChanges, SimpleChanges, PipeTransform, Pipe
} from "@angular/core";
import template from "./item-editor.component.html";
import {MeteorObservable} from "meteor-rxjs";
import {Subscription} from "rxjs";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItem} from "../../../../both/models/single-item.model";
import { CustomValidators } from 'ng2-validation';
import * as _ from 'underscore'
/**
 * Created by a.nvlkv on 15/01/2017.
 */

export interface IItemFormConfig{
    name?: string;
    group?: string;
    value?: string;
    verbose?: string;
    tip?: string;
    type?: string;
    validators?: Validators[];
    fields?: IItemFormConfig[];
    options?: IItemFormConfig[];
    optionsRetriever?():void;
}

@Component({
    selector: 'item-editor',
    template
})

export class ItemEditorComponent implements OnInit{
    @Input() itemId: string;
    @Input() itemEditorIsActive: boolean = false;

    itemSub: Subscription;
    item: ISingleItem;
    zone: NgZone;
    itemBaseFormGroup: FormGroup;
    itemDetailsFormGroup: FormGroup;
    itemDetailsFormContent: any={};
    itemTypeOptions: IItemFormConfig[];
    currentItemType: IItemFormConfig;
    sourceTypeConfig: IItemFormConfig;
    valueSourceOptions: any[];

    constructor(
        private formBuilder: FormBuilder,
    ){
        this.zone = new NgZone({enableLongStackTrace: true});
        this.itemDetailsFormGroup = this.formBuilder.group({});
        this.itemBaseFormGroup = this.formBuilder.group({});

        this.sourceTypeConfig = {
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
                            // validators: [Validators.required]
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
                            optionsRetriever: this.getSourceOptions
                        }
                    ]
                }
            ]
        }

        let itemConfigurationOptions = {
            allowUndefined:{
                name:'allowUndefined',
                group:'itemConfig',
                verbose:'Allow N/A',
                tip:'no answer',
                type:'checkbox'
            },
            allowOther:{
                name: 'allowOther',
                group:'itemConfig',
                verbose: 'Allow other option...',
                tip:'adds input for custom option',
                type:'checkbox'
            },
            maxChar:{
                name:'maxChar',
                group:'itemConfig',
                verbose:'Maximum characters',
                type:'number',
                // validators: [CustomValidators.min(0), CustomValidators.gt(this.itemDetailsFormGroup.value.minChar || 0)]
            },
            minChar:{
                name:'minChar',
                group:'itemConfig',
                verbose:'Minimum characters',
                type:'number',
                // validators: [CustomValidators.min(0), CustomValidators.lt(this.itemDetailsFormGroup.value.maxChar || 0)]
            },
            maxCount:{
                name:'maxCount',
                group:'itemConfig',
                verbose:'Maximum items count',
                type:'number',
                // validators: [CustomValidators.min(0), CustomValidators.gt(this.itemDetailsFormGroup.value.minCount || 0)]
            },
            minCount:{
                name:'minCount',
                group:'itemConfig',
                verbose:'Minimum items count',
                type:'number',
                // validators: [CustomValidators.min(0), CustomValidators.lt(this.itemDetailsFormGroup.value.maxCount || 0)]
            },
            minVal:{
                name:'minVal',
                group:'itemConfig',
                verbose:'Minimum value',
                type:'number',
                // validators: [CustomValidators.lt(this.itemDetailsFormGroup.value.maxVal || 0)]
            },
            maxVal:{
                name:'maxVal',
                group:'itemConfig',
                verbose:'Minimum value',
                type:'number',
                // validators: [CustomValidators.gt(this.itemDetailsFormGroup.value.minVal || 0)]
            },
            minDate:{
                name:'minDate',
                group:'itemConfig',
                verbose:'Earliest date',
                type:'date',
                // validators: [CustomValidators.maxDate(this.itemDetailsFormGroup.value.maxDate)]
            },
            maxDate:{
                name:'maxDate',
                group:'itemConfig',
                verbose:'Latest date',
                type:'date',
                // validators: [CustomValidators.minDate(this.itemDetailsFormGroup.value.minDate)]
            },
            primaryText:{
                name: 'primaryText',
                verbose:'Primary text',
                type: 'richText',
                tip: 'main item task or question'
            },
            guidanceText:{
                name: 'guidanceText',
                verbose:'Guidance text',
                type: 'richText',
                tip: 'how to complete this item'
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
                    this.sourceTypeConfig
                ]
            },
            assets:{
                name: 'assets',
                verbose: 'Item assets',
                tip: 'stimuli provided to respondent',
                type: 'listing',
                fields:[
                    this.sourceTypeConfig
                ]
            }
        };

        this.itemTypeOptions=[
            {
                value:'yes-no',
                verbose:'Yes/No',
                fields:[
                    itemConfigurationOptions.allowUndefined
                ]
            },
            {
                value:'input',
                verbose:'Single field',
                fields:[
                    {
                        name:'inputType',
                        group: 'itemConfig',
                        verbose:'Field type',
                        type:'select',
                        options:[
                            {
                                value:'text',
                                verbose: 'Text',
                                fields:[
                                    itemConfigurationOptions.minChar,
                                    itemConfigurationOptions.maxChar
                                ]
                            },
                            {
                                value:'email',
                                verbose: 'Validated email',
                                fields:[
                                    itemConfigurationOptions.allowUndefined,
                                ]
                            },
                            {
                                value:'url',
                                verbose: 'Validated url',
                                fields:[
                                    itemConfigurationOptions.allowUndefined,
                                ]
                            },
                            {
                                value:'number',
                                verbose: 'Number',
                                fields:[
                                    itemConfigurationOptions.minVal,
                                    itemConfigurationOptions.maxVal
                                ]
                            },
                            {
                                value:'color',
                                verbose: 'Color',
                                fields:[
                                    itemConfigurationOptions.allowUndefined,
                                ]
                            },
                            {
                                value:'date',
                                verbose: 'Date',
                                fields:[
                                    itemConfigurationOptions.allowUndefined,
                                    itemConfigurationOptions.minDate,
                                    itemConfigurationOptions.maxDate,
                                ]
                            },
                            {
                                value:'time',
                                verbose: 'Time',
                                fields:[
                                    itemConfigurationOptions.allowUndefined
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
                    itemConfigurationOptions.minChar,
                    itemConfigurationOptions.maxChar
                ]
            },
            {
                value:'single-choice',
                verbose:'Single choice',
                fields:[
                    itemConfigurationOptions.allowOther,
                    itemConfigurationOptions.allowUndefined,
                    itemConfigurationOptions.assets
                ]
            },
            {
                value:'multiple-choice',
                verbose:'Multiple choice',
                fields:[
                    itemConfigurationOptions.allowOther,
                    itemConfigurationOptions.allowUndefined,
                    itemConfigurationOptions.minCount,
                    itemConfigurationOptions.maxCount,
                    itemConfigurationOptions.assets

                ]
            },
            {
                value:'primaryText',
                verbose:'Display',
                fields:[
                    itemConfigurationOptions.primaryText,
                    itemConfigurationOptions.guidanceText,
                    itemConfigurationOptions.display
                ]
            },
            {
                value:'listing',
                verbose:'List input',
                fields:[
                    itemConfigurationOptions.minCount,
                    itemConfigurationOptions.maxCount


                ]
            },
            {
                value:'rating',
                verbose:'Rating',
                fields:[
                    itemConfigurationOptions.allowUndefined,
                    itemConfigurationOptions.options,
                    itemConfigurationOptions.assets
                ]
            },
            {
                value:'ordering',
                verbose:'Drag-sorting',
                fields:[
                    itemConfigurationOptions.assets,
                    itemConfigurationOptions.minCount,
                    itemConfigurationOptions.maxChar

                ]
            },
            {
                value:'grouping',
                verbose:'Grouping',
                fields:[
                    itemConfigurationOptions.allowOther,
                    itemConfigurationOptions.options,
                    itemConfigurationOptions.assets

                ]
            }
        ];
    }

    ngOnInit(){
        this.itemSub = MeteorObservable.subscribe('author-per-item-subscription', this.itemId).subscribe(()=>{
            this.zone.run(()=>{
                this.item = Items.findOne(this.itemId);

                if (!this.item.itemConfig){
                    this.item.itemConfig={itemType: ''};
                }

                this.itemBaseFormGroup.addControl('name',this.formBuilder.control(this.item.name, Validators.required));
                this.itemBaseFormGroup.addControl('description',this.formBuilder.control(this.item.description));
                this.itemBaseFormGroup.addControl('primaryText',this.formBuilder.control(this.item.primaryText));
                this.itemBaseFormGroup.addControl('guidanceText',this.formBuilder.control(this.item.guidanceText));
                this.itemBaseFormGroup.addControl('itemConfig',this.formBuilder.group({itemType: [this.item.itemConfig.itemType, Validators.required]}));

                if(!this.item.name){
                    this.itemEditorIsActive = true;
                }else {
                    this.itemEditorIsActive = false;
                }

                this.itemBaseFormGroup.valueChanges.subscribe((value)=>{
                    if(value.itemConfig.itemType){
                        let currentOption = this.itemTypeOptions.find((opt)=>opt.value===value.itemConfig.itemType);
                        if(currentOption.fields){
                            this.zone.run(()=> {
                                this.itemDetailsFormContent={};
                                
                                this.itemDetailsFormGroup = this.getItemDetailsFormControls(currentOption.fields);
                                this.currentItemType = currentOption;

                            });
                        }
                    }
                })
            })
        });


    }

    getSourceOptions(){
        return null;
    }

    getItemDetailsFormControls(fields: IItemFormConfig[], formGroup?: FormGroup, parentGroupName?:string):FormGroup{
        formGroup = formGroup || this.formBuilder.group({});
        fields.forEach((field)=>{

            if(!field.group || field.group === parentGroupName){
                let control;
                let name=parentGroupName ? this.item[parentGroupName][field.name] : this.item[field.name];

                switch (field.type){
                    case 'listing':
                        control = this.formBuilder.array([
                            this.getItemDetailsFormControls(field.fields)
                        ]);
                        this.itemDetailsFormContent['addTo_'+field.name]=()=>{
                            control.push(this.getItemDetailsFormControls(field.fields))
                        }
                        this.itemDetailsFormContent['removeAt_'+field.name]=(i)=>{
                            control.removeAt(i);
                        }
                        break;
                    default:
                        control = this.formBuilder.control(field.group ? this.item[field.group][field.name] : this.item[field.name]);
                        break;
                }


                formGroup.addControl(
                    field.name,
                    control
                );

                this.itemDetailsFormContent[field.name] = control;

            }else if(!formGroup.contains(field.group)){

                let sameGroupFields = fields.filter((fld)=>fld.group===field.group);

                let groupToNest = this.getItemDetailsFormControls(sameGroupFields, null, field.group);
                formGroup.addControl(field.group, groupToNest);

            }

            if(field.options){
                formGroup.valueChanges.subscribe((value)=>{
                    let currentOption = field.options.find((opt)=>opt.value===value[field.name]);
                    if(currentOption && currentOption.fields){
                        currentOption.fields.forEach((fld)=>{
                            if(!formGroup.contains(fld.name)){
                                formGroup.addControl(fld.name, this.formBuilder.control(''));
                            }
                        })

                        for (let controlName in formGroup.controls){
                            if(
                                !currentOption.fields.find(opt=>opt.name===controlName)
                                && controlName !== field.name
                                && formGroup.contains(controlName)
                            ){
                                formGroup.removeControl(controlName);
                            }
                        }
                    }
                })

                try{
                    formGroup.controls[field.name].setValue(field.options[0].value);
                }catch (e){
                    console.log(e);
                }
            }

        })

        return formGroup;
    }

    saveItem(e){
        if(this.itemBaseFormGroup.valid){
            let item = this.itemBaseFormGroup.value;

            if(this.itemDetailsFormGroup.valid){
                let config={
                        ...item.itemConfig,
                        ...this.itemDetailsFormGroup.value.itemConfig
                    }

                item = {
                    ...item,
                    ...this.itemDetailsFormGroup.value,
                    itemConfig: config
                }
            }

            Items.update(this.itemId, item).subscribe((resp)=>{
                this.zone.run(()=>{
                    if(resp){
                        this.itemEditorIsActive = false;
                    }
                })
            });
        }

    }

}

@Pipe({
    name: 'fieldNameFind',
})
export class FieldNameFindPipe implements PipeTransform{
    transform(fields: IItemFormConfig[], name: string):IItemFormConfig{
        if(fields){
            return fields.find((fld)=>fld.name===name);
        }
    }
}