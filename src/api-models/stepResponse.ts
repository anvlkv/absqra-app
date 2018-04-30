import { Base } from './base';
import { Step } from './step';
import { SequenceResponse } from './response';
import { ResponseBody } from './responseBody';
export declare class StepResponse extends Base {
    step: Step;
    response: SequenceResponse;
    body: ResponseBody;
}
