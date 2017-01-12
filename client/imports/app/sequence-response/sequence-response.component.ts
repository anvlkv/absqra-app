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
import {Tasks} from "../../../../both/collections/tasks.collection";
import {ISingleTaskComposition, ISingleChoice} from "../../models/single-task-composition.model";

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
    taskId: string;
    taskSub: Subscription;
    task: ISingleTaskComposition;
    private formGroupItems: any;
    choices: ISingleChoice[];
    responseForm: FormGroup;
    zone: NgZone;
    showFormControls: boolean;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ){
        this.zone = new NgZone({enableLongStackTrace: false});
    }

    ngOnInit(){

        this.paramsSub = this.route.params
            .subscribe(params => {

                this.sequenceId = params['sequenceId'];
                this.taskId = params['taskId'];

                if (this.sequenceSub) {
                    this.sequenceSub.unsubscribe();
                }

                this.sequenceSub = MeteorObservable.subscribe('sequence', this.sequenceId).subscribe(()=>{
                    this.sequence = Sequences.findOne(this.sequenceId);
                });

                if (this.taskSub){
                    this.taskSub.unsubscribe();
                }

                this.taskSub = MeteorObservable.subscribe('task', this.taskId).subscribe(()=>{
                    this.zone.run(()=>{
                        this.loadTask();
                    })
                });

            });

    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.sequenceSub.unsubscribe();
    }

    loadTask(): void{
        this.task = Tasks.findOne(this.taskId);
        this.choices = [];

        if (this.task.assets){
            this.loadTaskAssets();
        }
        this.buildForm();
    }

    buildForm():void{
        this.formGroupItems = {};
        this.showFormControls = true;

        switch (this.task.taskConfig.taskType){
            case 'multiple-choice':
                this.choices.forEach((choice)=>{
                    this.formGroupItems[choice.name] = ['']
                });
                break;
            case 'listing':
            case 'display':
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
        this.task.assets.forEach((asset, index)=>{
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

        this.task.choices=this.choices;

    }

    submitItemResponse(e?){
        // let responseForm: FormGroup = this.itemResponseView.responseForm;
        console.log(this.responseForm);
        let answered_to = this.sequence.items_sequence.indexOf(this.taskId);

        if(this.responseForm.valid){

            let response = ItemsResponses.insert({
                item_id:this.taskId,
                value: this.responseForm.value,
                meta: false,
            });

            response.subscribe((response_id)=>{


                let response = SequencesResponses.upsert({_id:this.responseId},{$set:{
                    sequence_id: this.sequenceId}, $push:{items_responses:[this.taskId, response_id]}});

                response.subscribe((result:any)=>{
                    if (result.insertedId){
                        this.responseId = result.insertedId;
                    }


                    if(answered_to >= 0 && this.sequence.items_sequence[answered_to+1]){
                        this.goToItem(this.sequence.items_sequence[answered_to+1]);
                    }
                });
            });

        }else if (this.formGroupItems.length === 0){
            this.goToItem(this.sequence.items_sequence[answered_to+1]);
        }
    }

    resetResponseForm(e?){
        // console.log(this.responseForm, e);

        this.responseForm.reset();
    }

    goToItem(item_id){
        this.router.navigate(['/response', this.sequenceId, item_id]);
    }
}