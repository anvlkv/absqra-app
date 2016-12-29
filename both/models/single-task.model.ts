import {IMongoDocument} from "./mongo-document.model";
/**
 * Created by a.nvlkv on 20/11/2016.
 */

export interface ITaskConfig {
    taskType: string,
    inputType?: string,
    maxChar?: number,
    minChar?: number,
    maxVal?: number,
    minVal?: number,
    maxCount?: number,
    minCount?: number,
    allowOther?: boolean,
    allowUndefined?: boolean,
    allowNewGroups?: boolean
}

export interface ITaskOption {
    label?: string,
    value?: number
}

export interface ITaskAsset {
    assetType: string,
    text?: string
}

export interface ISingleTask extends IMongoDocument{
    primaryText: string,
    guidanceText: string,
    taskConfig: ITaskConfig,
    options?: ITaskOption[],
    assets?: ITaskAsset[],
    display?: string
}