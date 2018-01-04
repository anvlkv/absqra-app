import { Injectable } from '@angular/core';
import { GeneralDataService } from './general-data.service';
import { Header, Sequence } from '../models/sequence';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Step } from '../models/step';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SequenceDesignService {
  private $sequence: BehaviorSubject<Sequence>;
  private sequence: Sequence;
  constructor(
    private api: GeneralDataService
  ) {
    this.$sequence = new BehaviorSubject(null);
    this.getSequence().subscribe(s => this.sequence = s);
  }

  public getSequence(): Observable<Sequence> {
    return this.$sequence.asObservable();
  }

  public getStep(stepId: number): Observable<Step> {
    const $stepSubj = new BehaviorSubject(null);

    this.getSequence().subscribe(s => {
      const desiredStep = s.steps.find(step => step.id === stepId);
      if (desiredStep) {
        $stepSubj.next(desiredStep);
      }
      else {
        this.api.getData('interviewerRoutes', 'getStep', {stepId}).subscribe( step => {
          $stepSubj.next(step);
        });
      }
    });

    return $stepSubj.asObservable();
  }

  public set$sequence(sequenceId: number): Observable<Sequence> {
    const observableSequence = this.getSequence();

    this.api.getData('interviewerRoutes', 'getSequence', {sequenceId: sequenceId}).subscribe(s => this.$sequence.next(s));

    return observableSequence;
  }

  public addNewItem(): Observable<Step> {
    const $stepSubj = new Subject();

    this.api.postData('interviewerRoutes', 'addNewItemToSequence', {sequenceId: this.sequence.id}, {}).subscribe(step => {
      this.$sequence.next({
        ...this.sequence,
        steps: [
          ...this.sequence.steps,
          step
        ]
      });
      $stepSubj.next(step);
    });

    return $stepSubj.asObservable();
  }

  public updateSequenceHeader(header: Header): Observable<Sequence> {
    this.api.patchData('interviewerRoutes', 'updateSequenceHeader', {sequenceId: this.sequence.id}, header).subscribe(seq => {
      this.$sequence.next(seq);
    });

    return this.$sequence.asObservable();
  }

  public updateSequenceStepsOrder(steps: Step[]): Observable<Sequence> {
    this.api.patchData('interviewerRoutes', 'updateSequenceStepsOrder', {sequenceId: this.sequence.id}, steps).subscribe(s => this.$sequence.next(s));

    this.$sequence.next({
      ...this.sequence,
      steps
    });

    return this.$sequence.asObservable();
  }

  public createNewSequence(sequence: Sequence) {
    this.api.postData('interviewerRoutes', 'addSequence', {}, sequence).subscribe(s => {
      // this.set$sequence(s.id);
      this.$sequence.next(s);
    });

    return this.$sequence.asObservable();
  }

}
