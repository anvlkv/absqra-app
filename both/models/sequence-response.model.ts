import {IMongoDocument} from "./mongo-document.model";
/**
 * Created by a.nvlkv on 27/12/2016.
 */
export interface ISequenceResponse extends IMongoDocument{
    sequence_id: string,
    items_responses: [string, string][],
    respondent?: string,
    meta?: any
}