import { Meteor } from 'meteor/meteor';
import {Items} from '../../../both/collections/items.collection';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

Meteor.publish('items', ()=> Items.find());
Meteor.publish('item', (itemId: string)=> Items.find(itemId));