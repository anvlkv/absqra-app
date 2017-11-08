import { ItemUse } from './item-use';


export interface Sequence {
  id: string;
  name: string;
  description: string;
  sequenceMode: string;
  uses: ItemUse[];
}
