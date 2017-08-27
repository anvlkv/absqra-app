import { ItemTypes } from './item-types';
import { ItemAsset } from './item-asset';

export interface Item {
  id: string;
  name: string;
  question: string;
  type: ItemTypes;
  assets: ItemAsset[];
}
