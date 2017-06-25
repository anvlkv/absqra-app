import {ISingleItem} from "./single-item.model";
/**
 * Created by a.nvlkv on 11/01/2017.
 */

export interface ISingleSource{
    label: string;
    value: number | boolean | string;
    name?: string;
    checked?: boolean;
}

export interface ISingleItemComposition extends ISingleItem{
    assets?: ISingleSource[];
    options?: ISingleSource[];
}

