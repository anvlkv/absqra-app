import {Sequences} from "../../../both/collections/sequences.collection";
import {ISequence} from "../../../both/models/single-sequence.model";
import {Tasks} from "../../../both/collections/tasks.collection";
import {loadTasks} from "./tasks";
/**
 * Created by a.nvlkv on 27/12/2016.
 */

export function loadSequence(){
    if(Sequences.find().cursor.count() === 0){
        let sequences: ISequence[] = [];
        let tasks: string[] = [];

        if(Tasks.find().cursor.count() > 0){
            Tasks.find().cursor.forEach((tsk)=>{
                tasks.push(tsk._id);
            });
        } else {
            loadTasks();
            Tasks.find().cursor.forEach((tsk)=>{
                tasks.push(tsk._id);
            });
        }

        sequences.push({items_sequence:tasks});

        sequences.forEach((sequence)=>{
            Sequences.insert(sequence);
        })
    }
}