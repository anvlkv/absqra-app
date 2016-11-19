import {MongoDocument} from "./mongo-document.model";

export interface TaskConfig {
    type: string
}

export interface SingleTask extends MongoDocument{
    primaryText: string,
    guidanceText: string,
    taskConfig: TaskConfig
}