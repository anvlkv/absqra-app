import { Base } from './base';
import { Step } from './step';
import { SequenceResponse } from './sequenceResponse';
import { ResponseBody } from './responseBody';
export declare class StepResponse extends Base {
    step?: Step;
    stepId?: number;
    sequenceResponse?: SequenceResponse;
    sequenceResponseId?: string;
    body?: ResponseBody;
}
