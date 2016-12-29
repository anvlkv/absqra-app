import {Meteor} from  "meteor/meteor"
import {Sequences} from "../../../both/collections/sequences.collection";
/**
 * Created by a.nvlkv on 27/12/2016.
 */
Meteor.publish('sequences', ()=> Sequences.find());
Meteor.publish('sequence', (sequenceId: string)=> Sequences.find(sequenceId));