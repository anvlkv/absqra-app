import { Item } from './item';
import { Sequence } from './sequence';


export interface Step {
  id?: number;
  type?: string;
  item?: Item;
  isItemOrigin?: boolean;
  sequence?: Sequence;
  logic?: string;
}
