import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Sequence } from '../models/sequence';

@Injectable()
export class SequenceService {
  private subjectSequence = new Subject<Sequence>();
  private activeSequence: Sequence;

  sequence$ = this.subjectSequence.asObservable();

  constructor(
    private router: Router
  ) {
    this.sequence$.subscribe(s => {
      this.activeSequence = s;
    });
  }

  setSequence(s: Sequence) {
    this.subjectSequence.next(s);
  }

  nextItem(_id: string) {
    const currentItemId = this.activeSequence.uses.indexOf(_id);

    if (currentItemId >= 0 && this.activeSequence.uses[currentItemId + 1])  {
      return this.router.navigate(['answer', this.activeSequence._id, this.activeSequence.uses[currentItemId + 1]]);
    }
    else {
      return this.router.navigate(['answer', this.activeSequence._id, 'completed']);
    }
  }

}
