import { Step } from './step';


export interface Header {
  name?: string;
  description?: string;
}

export interface Sequence {
  id?: string;
  header?: Header;
  steps?: Step[];
}
