import { Base } from './base';
import { Sequence } from './sequence';
import { RespondentsList } from './respondentsList';
import { SequenceResponse } from './sequenceResponse';
export declare class Project extends Base {
    name?: string;
    description?: string;
    topSequence?: Sequence;
    topSequenceId?: number;
    respondentsLists: RespondentsList[];
    respondentsListsIds?: string[];
    sequenceResponses: SequenceResponse[];
    sequenceResponsesIds?: string[];
}
