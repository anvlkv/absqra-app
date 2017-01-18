import {ISingleItem} from "./single-item.model";
/**
 * Created by a.nvlkv on 11/01/2017.
 */

export interface ISingleChoice{
    label: string,
    value: number,
    name: string,
    checked: boolean
}

export interface ISingleItemComposition extends ISingleItem{
    choices?: ISingleChoice[]
}

