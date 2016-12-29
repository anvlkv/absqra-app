import {IMongoDocument} from "./mongo-document.model";
/**
 * Created by a.nvlkv on 20/11/2016.
 */


export interface IItemResponse extends IMongoDocument{
    item_id:  string,
    value: any,
    meta?: any
}
