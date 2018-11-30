import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Sequence, SequenceResponse, StepResponse } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { ApiService } from '../../app-common/api-service/api.service';

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
      this.openSequenceResponse(s).subscribe(response  => {
        this.responseId = response.id;
        this.$activeStep.next(s.stepsIds[0]);
      });
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
    private api: ApiService
  ) {
    this.$value = new Subject<StepResponse>();
    this.valueChanges = this.$value.asObservable();
    this.$activeStep = new ReplaySubject<string>(1);
    this.activeStep = this.$activeStep.asObservable();
    this.$activeStep.subscribe(id => this.stepId = id);

  }

  openSequenceResponse({id, projectId}: Sequence) {
    return this.api.postData<SequenceResponse>(CRUDRouter.repoSequenceResponses, {}, {sequence: {id}, project: {id: projectId}})
  }

  sendResponse(value: StepResponse) {
    this.api.postData<StepResponse>(CRUDRouter.repoStepResponsesOfSequenceResponse, {sequenceResponseId: this.responseId}, value).subscribe(response  => {
      if (response) {
        const currentIndex = this.sequence.stepsIds.indexOf(this.stepId);
        const nextStep = this.sequence.stepsIds[currentIndex + 1];
        if (nextStep) {
          this.$activeStep.next(nextStep);
        }
      }
    });
  }


}
