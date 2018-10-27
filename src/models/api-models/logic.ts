import { Base } from './base';
import { LogicTypes } from './enums/logic.enums';
import { Step } from './step';
import { FormatConstraint } from './formatConstraint';
export declare class Logic extends Base {
    type: LogicTypes;
    sourceStep?: Step;
    sourceStepId?: string;
    destinationStep?: Step;
    destinationStepId?: string;
    formatConstraints?: FormatConstraint[];
    formatConstraintsIds?: string[];
    parent?: Logic;
    alternatives?: Logic[];
    parentId?: string;
    alternativesIds?: string[];
}
