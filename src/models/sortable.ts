
export interface OldSortable {
  order?: number;
  [field: string]: any;
}

export interface Sortable<T> {
  order: number;
  item: T;
}
