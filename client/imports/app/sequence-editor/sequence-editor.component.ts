import {Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone} from "@angular/core";
import template from "./sequence-editor.component.html";
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
    selector: 'sequence-editor',
    template
})

export class SequenceEditorComponent implements OnInit, OnDestroy{
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
                        // this.loadTask();
                        console.log(this.taskId);
                    })
                });

            });

    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.sequenceSub.unsubscribe();
    }

}