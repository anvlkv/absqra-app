export interface Sortable<T> {
  order: number;
  item: T;
  onChange: (value: any[]) => void;
  onBlur: (value: any) => void;
  onFocus: (value: any) => void;
}
