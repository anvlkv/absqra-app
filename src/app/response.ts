import { ItemResponse } from './item-response';

export interface SequenceResponse {
  id: string;
  sequenceId: string;
  items: ItemResponse[];
}
