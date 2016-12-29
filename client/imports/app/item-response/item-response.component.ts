import {Component, OnInit, OnDestroy, Output, EventEmitter, ApplicationRef} from '@angular/core';
import template from './item-response.component.html';
import {ISingleTask} from '../../../../both/models/single-task.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import 'rxjs/add/operator/map';
import {Tasks} from '../../../../both/collections/tasks.collection';
import {MeteorObservable} from "meteor-rxjs";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ItemsResponses} from "../../../../both/collections/items-responses.collection";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response',
    template
})

export class ItemResponseComponent implements OnInit, OnDestroy{
    taskId: string;
    task: ISingleTask;
    taskSub: Subscription;
    paramsSub: Subscription;
    responseForm: FormGroup;
    choices: any[] = [];

    @Output() onSuccessfulSubmission = new EventEmitter<[string, string]>();

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private appRef: ApplicationRef,
    ){}

    ngOnInit(){
        this.paramsSub = this.route.params
            .map(params => params['taskId'])
            .subscribe(taskId => {
                this.taskId = taskId;

                if (this.taskSub){
                    this.taskSub.unsubscribe();
                }

                this.taskSub = MeteorObservable.subscribe('task', this.taskId).subscribe(()=>{
                    this.task = Tasks.findOne(this.taskId);


                    let formGroupItems: any = {
                        responseInput: ['', Validators.required]
                    };


                    if (this.task.assets){
                        this.task.assets.forEach((asset, index)=>{
                            if (asset.assetType === 'text'){
                                let choiceName = 'responseChoice_'+index;
                                this.choices.push({
                                    label: asset.text,
                                    value: index,
                                    name: choiceName
                                });


                                switch (this.task.taskConfig.taskType){
                                    case 'single-choice':
                                        break;
                                    default:
                                        formGroupItems[choiceName] = [choiceName]
                                }
                            }
                        })
                    }

                    this.responseForm = this.formBuilder.group(formGroupItems);

                    this.appRef.tick();

                });
            });
    }

    submitResponse(): void{
        if(this.responseForm.valid){

            let response = ItemsResponses.insert({
                item_id:this.taskId,
                value: this.responseForm.value,
                meta: false,
            });

            response.subscribe((response_id)=>{
                this.onSuccessfulSubmission.emit([this.taskId, response_id]);
            });

        }
    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.taskSub.unsubscribe();
    }
}


