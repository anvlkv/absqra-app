import { Step } from './step';
import { Base } from './base';
import { SequenceHeader } from './sequenceHeader';
import { Project } from './project';
export declare class Sequence extends Base {
    header?: SequenceHeader;
    steps?: Step[];
    stepsIds?: string[];
    referencedBySteps?: Sequence[];
    project?: Project;
    projectId?: Project;
}
