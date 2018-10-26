import { Sequence } from './sequence';
import { StepTypes } from './enums/step.enums';
import { Question } from './question';
import { Task } from './task';
import { Logic } from './logic';
import { StepAsset } from './stepAsset';
import { OrderableBase } from './orderableBase';
export declare class Step extends OrderableBase {
    type?: StepTypes;
    sequenceReference?: Sequence;
    sequenceReferenceId?: string;
    questionReference?: Question;
    questionReferenceId?: string;
    taskReference?: Task;
    taskReferenceId?: string;
    logicReference?: Logic;
    logicReferenceId?: string;
    assetReference?: StepAsset;
    assetReferenceId?: string;
    sequence?: Sequence;
    sequenceId?: string;
}
