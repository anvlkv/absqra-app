import {Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone} from "@angular/core";
import template from "./sequence-response.component.html";
import {ActivatedRoute, Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Sequences} from "../../../../both/collections/sequences.collection";
import {ISequence} from "../../../../both/models/single-sequence.model";
import {Subscription} from 'rxjs';
import {SequencesResponses} from "../../../../both/collections/sequences-responses.collection";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ItemsResponses} from "../../../../both/collections/items-responses.collection";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItemComposition, ISingleChoice} from "../../../../both/models/single-task-composition.model";

/**
 * Created by a.nvlkv on 01/12/2016.
 */

@Component({
    selector: 'sequence-response',
    template
})

export class SequenceResponseComponent implements OnInit, OnDestroy{
    paramsSub: Subscription;
    sequenceSub: Subscription;
    sequenceId: string;
    sequence: ISequence;
    responseId: string;
    itemId: string;
    itemSub: Subscription;
    item: ISingleItemComposition;
    formGroupItems: any;
    choices: ISingleChoice[];
    responseForm: FormGroup;
    zone: NgZone;
    showFormControls: boolean;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ){
        this.zone = new NgZone({enableLongStackTrace: true});
    }

    ngOnInit(){

        this.paramsSub = this.route.params
            .subscribe(params => {

                this.sequenceId = params['sequenceId'];
                if (this.sequenceSub) {
                    this.sequenceSub.unsubscribe();
                }

                this.sequenceSub = MeteorObservable.subscribe('sequence', this.sequenceId).subscribe(()=>{
                    this.sequence = Sequences.findOne(this.sequenceId);
                    if(!params['itemId']){
                        this.router.navigate(['response', this.sequenceId, this.sequence.itemsSequence[0]]).then(()=>{
                            this.itemId = this.sequence.itemsSequence[0];
                            this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(()=>{
                                this.zone.run(()=>{
                                    this.loadTask();
                                })
                            });
                        });
                    }

                });



                if (this.itemSub){
                    this.itemSub.unsubscribe();
                }

                if(params['itemId']){
                    this.itemId = params['itemId'];
                    this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(()=>{
                        this.zone.run(()=>{
                            this.loadTask();
                        })
                    });
                }




            });

    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.sequenceSub.unsubscribe();
    }

    loadTask(): void{
        this.item = Items.findOne(this.itemId);
        this.choices = [];

        if (this.item.assets){
            this.loadTaskAssets();
        }
        this.buildForm();
    }

    buildForm():void{
        this.formGroupItems = {};
        this.showFormControls = true;

        switch (this.item.itemConfig.itemType){
            case 'multiple-choice':
                this.choices.forEach((choice)=>{
                    this.formGroupItems[choice.name] = ['']
                });
                break;
            case 'listing':
            case 'primaryText':
                break;
            case 'yes-no':
                this.showFormControls = false;
            default:
                this.formGroupItems = {
                    responseInput: ['', Validators.required]
                };
                break;
        }

        this.responseForm = this.formBuilder.group(this.formGroupItems);

    }

    loadTaskAssets(): void{
        this.item.assets.forEach((asset, index)=>{
            if (asset.assetType === 'text'){
                let choiceName = 'responseChoice_'+index;
                this.choices.push({
                    label: asset.text,
                    value: index,
                    name: choiceName,
                    checked: false
                });
            }
        });

        this.item.choices=this.choices;

    }

    submitItemResponse(e?){
        // let responseForm: FormGroup = this.itemResponseView.responseForm;
        // console.log(this.responseForm);
        let answered_to = this.sequence.itemsSequence.indexOf(this.itemId);

        if(this.responseForm.valid){

            let response = ItemsResponses.insert({
                item_id:this.itemId,
                value: this.responseForm.value,
                meta: false,
            });

            response.subscribe((response_id)=>{


                let response = SequencesResponses.upsert({_id:this.responseId},{$set:{
                    sequence_id: this.sequenceId}, $push:{items_responses:[this.itemId, response_id]}});

                response.subscribe((result:any)=>{
                    if (result.insertedId){
                        this.responseId = result.insertedId;
                    }


                    if(answered_to >= 0 && this.sequence.itemsSequence[answered_to+1]){
                        this.goToItem(this.sequence.itemsSequence[answered_to+1]);
                    }
                });
            });

        }else if (this.formGroupItems.length === 0){
            this.goToItem(this.sequence.itemsSequence[answered_to+1]);
        }
    }

    resetResponseForm(e?){
        // console.log(this.responseForm, e);

        this.responseForm.reset();
    }

    goToItem(item_id){
        this.resetResponseForm();
        this.router.navigate(['/response', this.sequenceId, item_id]);
    }
}