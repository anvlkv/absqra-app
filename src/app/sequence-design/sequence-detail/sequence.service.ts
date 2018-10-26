import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Sequence } from 'models/api-models/index';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {
  public activeSequence: ReplaySubject<Sequence>;

  constructor() {
    this.activeSequence = new ReplaySubject<Sequence>(1);
  }
}
