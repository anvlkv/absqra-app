import { Item } from './item';


export interface ItemUse {
  useMode: string;
  modifiable: boolean;
  assetsVisibilityMode: string;
  item: Item;
  isItemOrigin: boolean;
}
