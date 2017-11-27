import { Injectable } from '@angular/core';
import { GeneralDataService } from './general-data.service';
import { Sequence } from '../models/sequence';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Step } from '../models/step';


@Injectable()
export class SequenceDesignService {
  private $sequence: Subject<Sequence>;
  private sequence: Sequence;
  constructor(
    private api: GeneralDataService
  ) {
    this.$sequence = new Subject();
    this.getSequence().subscribe(s => this.sequence = s);
  }

  public getSequence(): Observable<Sequence> {
    return this.$sequence.asObservable();
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

}
