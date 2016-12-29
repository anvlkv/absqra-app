import { Meteor } from 'meteor/meteor';
import {loadTasks} from './imports/fixtures/tasks';
import './imports/publications/tasks';
import './imports/publications/sequences';
import {loadSequence} from "./imports/fixtures/sequence";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

Meteor.startup(()=>{
    loadTasks();
    loadSequence();
})