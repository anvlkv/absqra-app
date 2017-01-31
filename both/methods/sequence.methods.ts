import {Items} from "../collections/items.collection";
import {Sequences} from "../collections/sequences.collection";

Meteor.methods({
    newItemInSequence: function (sequenceId: string) {
        check(sequenceId, String);
        let newItem = Items.collection.insert({});

        Sequences.collection.update(sequenceId, {$push:{itemsSequence: newItem}});

        return newItem;
    }
});