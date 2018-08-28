export interface Sortable<T> {
  order: number;
  item: T;
  onOrderChange: (value: any[]) => void;
  onBlur: (value: any) => void;
  onFocus: (value: any) => void;
}
