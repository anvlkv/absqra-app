import {IMongoDocument} from "./mongo-document.model";
/**
 * Created by a.nvlkv on 27/12/2016.
 */
export interface ISequence extends IMongoDocument{
    items_sequence: string[],
}