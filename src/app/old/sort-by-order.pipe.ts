import { Pipe, PipeTransform } from '@angular/core';
import { OldSortable } from '../../models/sortable';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(value: OldSortable[], args?: any): any {
    return value ? value.sort((v1, v2) => {
      return v1.order - v2.order;
    }) : null;
  }
}
