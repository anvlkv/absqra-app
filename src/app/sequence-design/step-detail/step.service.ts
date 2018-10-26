import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Step } from 'models/api-models';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  public activeStep: ReplaySubject<Step>;


  constructor() {
    this.activeStep = new ReplaySubject<Step>(1);
  }
}
