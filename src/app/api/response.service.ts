import { Injectable } from '@angular/core';
import { Sequence } from '../../models/sequence';
import { GeneralDataService } from './general-data.service';
import { Subject } from 'rxjs/Subject';
import { Item } from '../../models/item';
import { Step } from '../../models/step';

@Injectable()
export class ResponseService {
  private $currentStep: Subject<Step>;
  private $currentSequence: Subject<Sequence>;
  private sequence: Sequence;
  private step: Step;

  constructor(
    private api: GeneralDataService
  ) {
    this.$currentStep = new Subject();
    this.$currentSequence = new Subject();
    this.getStep().subscribe(s => this.step = s);
    this.getSequence().subscribe(s => this.sequence = s);
  }

  getStep() {


    return this.$currentStep.asObservable();
  }

  getSequence() {
    return this.$currentSequence.asObservable();
  }

  set$sequence(sequenceId: number) {
    this.api.getData('respondentRoutes', 'getSequence', {sequenceId}).subscribe(s => {
      this.$currentSequence.next(s);
    });

    return this.getSequence();
  }

  nextStep() {
    const stepId = this.step ? this.step.id : null;
    const currentIndex = this.sequence.steps.findIndex(step => step.id == stepId);

    if (this.sequence.steps.length > currentIndex + 1) {
      this.api.getData('respondentRoutes', 'getStep', {sequenceId: this.sequence.id, stepId: this.sequence.steps[currentIndex + 1].id}).subscribe(step => this.$currentStep.next(step));
    }

    return this.getStep();
  }

  saveStepResponse(response) {
    return this.api.postData('respondentRoutes', 'saveResponse', { sequenceId: this.sequence.id, stepId: this.step.id }, response);
  }
}
