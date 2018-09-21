import { Base } from './base';
import { QuestionAsset } from './questionAsset';
import { FormatConstraint } from './formatConstraint';
import { QuantityOrder } from './enums/item.enums';
import { ResponseAsset } from './responseAsset';
import { QuestionContentAsset } from './questionContentAsset';
export declare class Question extends Base {
    name?: string;
    description?: string;
    contentAsset: QuestionContentAsset;
    contentAssetId?: number;
    offers: QuantityOrder;
    expects: QuantityOrder;
    formatConstraints?: FormatConstraint[];
    formatConstraintsIds?: number[];
    questionAssets?: QuestionAsset[];
    questionAssetsIds?: number[];
    responseAssets?: ResponseAsset[];
    responseAssetsIds?: number[];
}
