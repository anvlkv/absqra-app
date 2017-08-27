import { ItemAssetTypes } from './item-asset-types';
import { ItemAssetContentTypes } from './item-asset-content-types';
export interface ItemAsset {
  type: ItemAssetTypes;
  contentType: ItemAssetContentTypes;
  source?: string;
  content?: string;
}
