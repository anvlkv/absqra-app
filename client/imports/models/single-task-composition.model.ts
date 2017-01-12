import {ISingleTask} from "../../../both/models/single-task.model";
/**
 * Created by a.nvlkv on 11/01/2017.
 */

export interface ISingleChoice{
    label: string,
    value: number,
    name: string,
    checked: boolean
}

export interface ISingleTaskComposition extends ISingleTask{
    choices?: ISingleChoice[]
}

