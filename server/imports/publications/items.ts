import {Items} from '../../../both/collections/items.collection';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

Meteor.publish('items', ()=> Items.find());
Meteor.publish('item', (itemId: string)=> Items.find(itemId));

Meteor.publish('author-sequence-items-subscription', (itemsIds: string[])=>{
    if(itemsIds){
        for(let str in itemsIds){
            check(str, String);
        }

        return Items.find({_id:{$in:itemsIds}}, {fields:{name:1, description: 1}});
    }
});

Meteor.publish('author-per-item-subscription', (itemId: string[])=>{
    check(itemId, String);

    return Items.find(itemId);
});