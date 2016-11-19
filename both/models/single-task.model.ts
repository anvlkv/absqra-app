import {MongoDocument} from "./mongo-document.model";

export interface SingleTask extends MongoDocument{
    primaryTask: string
}