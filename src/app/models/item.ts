import { Asset } from './asset';


export interface Item {
  id: string;
  name: string;
  description: string;
  question: Asset;
  itemType: string;
  itemMode: string;
  assets: Asset[];
}
