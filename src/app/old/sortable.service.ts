import { Injectable } from '@angular/core';
import { OldSortable } from '../../models/sortable';

@Injectable()
export class SortableService {

  reorderSortables(sortables: OldSortable[], updatedItem: OldSortable, oldOrder: number, newOrder: number, orderToIndexShift = 1) {
    sortables = sortables.concat();
    updatedItem.order = newOrder;
    let diff = newOrder - oldOrder;

    if (!diff) {
      return sortables;
    }

    const step = (diff > 0 ? 1 : -1);
    do {
        sortables[oldOrder - orderToIndexShift + diff].order -= step;
        diff -= step;
    } while (diff !== 0);

    return sortables;
  }

  constructor() { }

}
