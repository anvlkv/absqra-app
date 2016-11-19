import { Meteor } from 'meteor/meteor';
import {loadTasks} from './imports/fixtures/tasks';
import './imports/publications/tasks';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

Meteor.startup(()=>{
    loadTasks();
})