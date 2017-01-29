import {Meteor} from  "meteor/meteor"
import {Sequences} from "../../../both/collections/sequences.collection";
import {Items} from "../../../both/collections/items.collection";
import {SequencesResponses} from "../../../both/collections/sequences-responses.collection";
import {check} from "meteor/check";
import {ISequence} from "../../../both/models/single-sequence.model";
import {ObservableCursor} from "meteor-rxjs";
import {ISingleItem} from "../../../both/models/single-item.model";
import {sequence} from "@angular/core";


/**
 * Created by a.nvlkv on 27/12/2016.
 */
Meteor.publish('sequences', ()=> Sequences.find());
Meteor.publish('sequence', (sequenceId: string)=> Sequences.find(sequenceId));


// TODO: use this subscription for sequence, it's items and responses of current respondent
Meteor.publish('respondent-per-sequence-subscription', (sequenceId: string)=>{
    const pubs = [];
    let seq = Sequences.find(sequenceId);
    let itms = Items.find({_id:{$in:seq.fetch()[0].itemsSequence}});
    let response = SequencesResponses.findOne({sequence_id: sequenceId});
    pubs.push(seq);
    pubs.concat(itms);

    return pubs;
});

Meteor.publish('author-per-sequence-subscription', (sequenceId: string)=>{
    if(sequenceId){
        check(sequenceId, String);

        return Sequences.find(sequenceId);
    }
});

Meteor.publish('author-sequence-items-subscription', (itemsIds: string[])=>{
    if(itemsIds){
        for(let str in itemsIds){
            check(str, String);
        }

        return Items.find({_id:{$in:itemsIds}});
    }
});