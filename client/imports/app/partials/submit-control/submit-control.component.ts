import {Component, Output, EventEmitter} from "@angular/core";
import template from "./submit-control.component.html";
// import {ActivatedRoute, Router} from "@angular/router";
// import {MeteorObservable} from "meteor-rxjs";
// import {Sequences} from "../../../../both/collections/sequences.collection";
// import {ISequence} from "../../../../both/models/single-sequence.model";
// import {Subscription} from 'rxjs';
// import {SequencesResponses} from "../../../../both/collections/sequences-responses.collection";
// import {FormGroup} from "@angular/forms";
// import {ItemsResponses} from "../../../../both/collections/items-responses.collection";
// import {ItemResponseComponent} from "../item-response/item-response.component";

/**
 * Created by a.nvlkv on 01/12/2016.
 */

@Component({
    selector: 'submit-control',
    template
})

export class SubmitControlComponent {
    @Output() submitCall = new EventEmitter();
    @Output() resetCall = new EventEmitter();


    constructor(
    ){
    }

    emitSubmit(){
        this.submitCall.emit();
    }

    emitReset(){
        this.resetCall.emit();
    }
}