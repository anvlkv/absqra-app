import {Sequences} from "../../../both/collections/sequences.collection";
import {ISequence} from "../../../both/models/single-sequence.model";
import {Items} from "../../../both/collections/items.collection";
import {loadTasks} from "./tasks";
/**
 * Created by a.nvlkv on 27/12/2016.
 */

export function loadSequence(){
    if(Sequences.find().cursor.count() === 0){
        let sequences: ISequence[] = [];
        let tasks: string[] = [];

        if(Items.find().cursor.count() > 0){
            Items.find().cursor.forEach((tsk)=>{
                tasks.push(tsk._id);
            });
        } else {
            loadTasks();
            Items.find().cursor.forEach((tsk)=>{
                tasks.push(tsk._id);
            });
        }

        sequences.push({name:'fixture', description: 'fixture sequence', itemsSequence:tasks});

        sequences.forEach((sequence)=>{
            Sequences.insert(sequence);
        })
    }
}