export enum SelectionState {
  OFF,
  IND,
  ON
}

export interface Selectable<T> {
  item: T;
  state: SelectionState;
}
