import { Asset } from './asset';
import { FormatConstraint } from './formatConstraint';


export interface Item {
  id?: number;
  name?: string;
  description?: string;
  question?: Asset;
  offers?: string;
  expects?: string;
  lifeCycle?: string;
  formatConstraints?: FormatConstraint;
  assets?: Asset[];
}
