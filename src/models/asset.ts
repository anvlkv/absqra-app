export interface Asset {
  id?: string;
  assetType?: string;
  contentType?: string;
  content?: string;
  containedInAsset?: Asset;
  subset?: Asset[];
}
