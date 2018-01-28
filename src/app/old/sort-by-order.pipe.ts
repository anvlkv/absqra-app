import { Pipe, PipeTransform } from '@angular/core';
import { Sortable } from '../../models/sortable';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(value: Sortable[], args?: any): any {
    return value ? value.sort((v1, v2) => {
      return v1.order - v2.order;
    }) : null;
  }

}
