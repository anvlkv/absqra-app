import { Base } from './base';
import { QuestionAsset } from './questionAsset';
import { FormatConstraint } from './formatConstraint';
import { QuantityOrder } from './enums/item.enums';
import { ResponseAsset } from './responseAsset';
import { QuestionContentAsset } from './questionContentAsset';
import { QuestionPresentationTypes } from './enums/questionPresentationTypes.enums';
export declare class Question extends Base {
    name?: string;
    description?: string;
    contentAsset: QuestionContentAsset;
    contentAssetId?: number;
    offers: QuantityOrder;
    expects: QuantityOrder;
    formatConstraints?: FormatConstraint[];
    formatConstraintsIds?: string[];
    questionAssets?: QuestionAsset[];
    questionAssetsIds?: string[];
    responseAssets?: ResponseAsset[];
    responseAssetsIds?: string[];
    presentationType?: QuestionPresentationTypes;
    private determinePresentationType?(next);
}
