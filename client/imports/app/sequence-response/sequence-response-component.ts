import {Component, OnInit, OnDestroy} from "@angular/core";
import template from "./sequence-response.component.html";
import {ActivatedRoute, Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Sequences} from "../../../../both/collections/sequences.collection";
import {ISequence} from "../../../../both/models/single-sequence.model";
import {Subscription} from 'rxjs';
import {SequencesResponses} from "../../../../both/collections/sequences-responses.collection";

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ){
    }

    ngOnInit(){
        // this.paramsSub

        this.paramsSub = this.route.params
            .map(params => params['sequenceId'])
            .subscribe(sequenceId => {
                this.sequenceId = sequenceId;

                if (this.sequenceSub) {
                    this.sequenceSub.unsubscribe();
                }

                this.sequenceSub = MeteorObservable.subscribe('sequence', this.sequenceId).subscribe(()=>{
                    this.sequence = Sequences.findOne(this.sequenceId);
                })

            });
    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.sequenceSub.unsubscribe();
    }

    onSuccessfulSubmission(item_response){

        let answered_to = this.sequence.items_sequence.indexOf(item_response[0]);
        let response = SequencesResponses.upsert({_id:this.responseId},{$set:{
            sequence_id: this.sequenceId}, $push:{items_responses:item_response}});
        response.subscribe((result:any)=>{
            console.log(result);

            if (result.insertedId){
                this.responseId = result.insertedId;
            }


            if(answered_to >= 0 && this.sequence.items_sequence[answered_to+1]){
                this.goToItem(this.sequence.items_sequence[answered_to+1]);
            }
        });
    }

    goToItem(item_id){
        this.router.navigate(['/response', this.sequenceId, item_id]);
    }
}