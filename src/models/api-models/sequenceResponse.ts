import { Project } from './project';
import { Base } from './base';
import { Sequence } from './sequence';
import { StepResponse } from './stepResponse';
export declare class SequenceResponse extends Base {
    project?: Project;
    sequence?: Sequence;
    sequenceId?: number;
    stepResponses?: StepResponse[];
    stepResponsesIds?: string[];
}
