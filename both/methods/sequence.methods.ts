import {check} from "meteor/check";
import {Items} from "../collections/items.collection";
import {Sequences} from "../collections/sequences.collection";

Meteor.methods({
    newItemInSequence: function (sequenceId: string) {
        check(sequenceId, String);
        let newItem = Items.insert({});
        newItem.subscribe((itemId)=>{
            Sequences.update(sequenceId, {$push:{itemsSequence: itemId}});
        })
    }
});