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

export interface IItemOption {
    label?: string,
    value?: number
}

export interface IItemAsset {
    assetType?: string,
    text?: string
}

export interface ISingleItem extends IMongoDocument{
    primaryText?: string,
    guidanceText?: string,
    itemConfig?: IItemConfig,
    options?: IItemOption[],
    assets?: IItemAsset[],
    display?: string,
    name?: string,
    description?: string
}