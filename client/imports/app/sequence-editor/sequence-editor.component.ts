import {Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone} from "@angular/core";
import template from "./sequence-editor.component.html";
import {ActivatedRoute, Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Sequences} from "../../../../both/collections/sequences.collection";
import {ISequence} from "../../../../both/models/single-sequence.model";
import {Subscription, Observable} from 'rxjs';
import {SequencesResponses} from "../../../../both/collections/sequences-responses.collection";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ItemsResponses} from "../../../../both/collections/items-responses.collection";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItemComposition, ISingleChoice} from "../../../../both/models/single-task-composition.model";
import {ISingleItem} from "../../../../both/models/single-item.model";

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
    items: Observable<ISingleItem[]>;
    sequenceDescriptorFormGroup: FormGroup;
    zone: NgZone;
    sequenceEditorIsActive: boolean;


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
                // this.itemId = params['itemId'];

                if (this.sequenceSub) {
                    this.sequenceSub.unsubscribe();
                }


                this.sequenceSub = MeteorObservable.subscribe('author-per-sequence-subscription', this.sequenceId).subscribe(()=>{
                    this.zone.run(()=>{
                        this.sequence = Sequences.findOne();
                        if (this.sequence){
                            this.sequenceEditorIsActive = false;

                            this.items = Items.find().zone();

                            console.log(Items.find().cursor.count())

                        }else{
                            this.sequenceEditorIsActive = true;
                            this.sequence = {name:'', description:'', itemsSequence:['']};
                        }
                        this.sequenceDescriptorFormGroup = this.formBuilder.group({
                            sequenceName: [this.sequence.name, Validators.required],
                            sequenceDescription: [this.sequence.description]
                        })
                    });
                });

            });

    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.sequenceSub.unsubscribe();
    }

    saveSequenceDescriptor(form: FormGroup){
        if(form.valid){
            let sequenceSaveResult = Sequences.upsert({_id:this.sequenceId}, {
                $set: {
                    name:form.value.sequenceName,
                    description:form.value.sequenceDescription
                }})

            sequenceSaveResult.subscribe((result:any)=>{
                this.zone.run(()=>{
                    if (result.insertedId){
                        this.sequenceId = result.insertedId;
                        this.router.navigate(['edit', this.sequenceId]);
                    }

                    this.sequenceEditorIsActive = false;
                })
            })
        }
    }

    createNewItem(){
        MeteorObservable.call('newItemInSequence', this.sequenceId).subscribe(()=>{
            console.log('new item added');
        }, (error)=>{
            console.log('new item not added:');
            console.log(error);
        });
    }
}