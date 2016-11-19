import {MongoObservable} from "meteor-rxjs";
import {SingleTask} from "../models/single-task.model";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export const Tasks = new MongoObservable.Collection<SingleTask>('tasks');