import { Injectable } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Sequence, SequenceResponse, StepResponse } from 'models/api-models';
import { RespondentRouter } from 'models/api-routes/RespondentRouter';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  activeStep: Observable<string>;
  responseId: string;
  sequenceId: string;
  valueChanges: Observable<StepResponse>;

  private _sequence: Sequence;
  private $activeStep: ReplaySubject<string>;
  private stepId: string;
  public get sequence(): Sequence {
    return this._sequence;
  }
  public set sequence(s: Sequence) {
    if (s) {
      this.$activeStep.next(s.stepIds[0]);
      this.openSequenceResponse(s);
    }
    else {
      console.log('do something. sequence unloaded');
    }

    this._sequence = s;
  }



  private _responseValue;

  get responseValue(): any {
    return this._responseValue;
  }

  set responseValue(value: any) {
    this._responseValue = {
      step: {id: this.stepId},
      body: {
        content: value
      }
    };
    this.$value.next(this._responseValue);

    this.sendResponse(this.responseValue);
  }

  private $value: Subject<StepResponse>;

  constructor(
    private data: DataService
  ) {
    this.$value = new Subject<StepResponse>();
    this.valueChanges = this.$value.asObservable();
    this.$activeStep = new ReplaySubject<string>(1);
    this.activeStep = this.$activeStep.asObservable();
    this.$activeStep.subscribe(id => this.stepId = id);

  }

  openSequenceResponse({id, projectId}: Sequence) {
    this.data.postData<SequenceResponse>(CRUDRouter.repoSequenceResponses, {}, {sequence: {id}, project: {id: projectId}}).subscribe(response  => {
      this.responseId = response.id;
    });
  }

  sendResponse(value: StepResponse) {
    this.data.postData<StepResponse>(CRUDRouter.repoStepResponsesOfSequenceResponse, {sequenceResponseId: this.responseId}, value).subscribe(response  => {
      if (response) {
        const currentIndex = this.sequence.stepIds.indexOf(this.stepId);
        const nextStep = this.sequence.stepIds[currentIndex + 1];
        if (nextStep) {
          this.$activeStep.next(nextStep);
        }
      }
    });
  }


}
