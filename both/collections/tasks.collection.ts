import {MongoObservable} from "meteor-rxjs";
import {ISingleTask} from "../models/single-task.model";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export const Tasks = new MongoObservable.Collection<ISingleTask>('tasks');