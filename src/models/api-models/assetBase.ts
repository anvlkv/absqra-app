import { AssetContentTypes, AssetTypes } from './enums/asset.enums';
import { OrderableBase } from './orderableBase';
export declare abstract class AssetBase extends OrderableBase {
    assetType?: AssetTypes;
    contentType?: AssetContentTypes;
    content?: string;
    sourceStepId?: string;
    isGenerated?: boolean;
}
