import { Meteor } from 'meteor/meteor';
import {Tasks} from '../../../both/collections/tasks.collection';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

Meteor.publish('tasks', ()=> Tasks.find());
Meteor.publish('task', (taskId: string)=> Tasks.find(taskId));