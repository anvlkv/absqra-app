import {IMongoDocument} from "./mongo-document.model";
/**
 * Created by a.nvlkv on 20/11/2016.
 */

export interface IItemConfig {
    itemType?: string,
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

export interface IDataSource {
    sourceType?: string,
    value?: string
}

export interface ISingleItem extends IMongoDocument{
    primaryText?: string,
    guidanceText?: string,
    itemConfig?: IItemConfig,
    optionsSources?: IDataSource[],
    assetsSources?: IDataSource[],
    display?: string,
    name?: string,
    description?: string
}