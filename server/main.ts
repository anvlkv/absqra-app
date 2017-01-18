import { Meteor } from 'meteor/meteor';
import './imports/publications/items';
import './imports/publications/sequences';
import '../both/methods/sequence.methods';
import {loadTasks} from './imports/fixtures/tasks';
import {loadSequence} from "./imports/fixtures/sequence";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

Meteor.startup(()=>{
    loadTasks();
    loadSequence();
})