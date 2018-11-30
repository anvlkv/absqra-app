export interface Sortable<T> {
  order: number;
  item: T;
  onOrderChange: (newOrder: number, oldOrder: number) => void;
  onBlur: (value: any) => void;
  onFocus: (value: any) => void;
}
