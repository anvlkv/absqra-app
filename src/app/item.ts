export interface Item {
  id: string;
  name: string;
  question: string;
  type: ItemTypes;
  assets: ItemAsset[];
}

export interface ItemAsset {
  type: ItemAssetTypes;
  contentType: ItemAssetContentTypes;
  source?: string;
  content?: string;
}

enum ItemTypes{
  selectMultiple,
  selectSingle,
  list
}

enum ItemAssetTypes{
  static,
  dynamic
}

enum ItemAssetContentTypes{
  text
}
