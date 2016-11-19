import {Tasks} from '../../../both/collections/tasks.collection';
import {SingleTask} from '../../../both/models/single-task.model';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export function loadTasks(){
    if (Tasks.find().cursor.count() === 0){
        const tasks: SingleTask[] =[
            {primaryTask: 'swim'},
            {primaryTask: 'now dance'},
            {primaryTask: 'now live'}
        ];

        tasks.forEach((task)=>{
            Tasks.insert(task);
        })
    }
}