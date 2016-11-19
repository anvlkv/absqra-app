import {Tasks} from '../../../both/collections/tasks.collection';
import {SingleTask} from '../../../both/models/single-task.model';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export function loadTasks(){
    if (Tasks.find().cursor.count() === 0){
        const tasks: SingleTask[] =[
            {
                primaryText: 'swim',
                guidanceText: 'in water',
                taskConfig: {
                    type: 'text'
                }
            },
            {
                primaryText: 'dive',
                guidanceText: 'in oil',
                taskConfig: {
                    type: 'text'
                }
            },
            {
                primaryText: 'breath',
                guidanceText: 'in air',
                taskConfig: {
                    type: 'text'
                }
            },
        ];

        tasks.forEach((task)=>{
            Tasks.insert(task);
        })
    }
}