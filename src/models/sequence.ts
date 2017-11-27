import { Step } from './step';


export interface Sequence {
  id?: string;
  name?: string;
  description?: string;
  steps?: Step[];
}
