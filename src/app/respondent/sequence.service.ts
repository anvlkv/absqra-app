import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Sequence } from '../sequence';
import { Router } from '@angular/router';

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

  nextItem(id: string) {
    const currentItemId = this.activeSequence.itemsIds.indexOf(id);

    if (currentItemId >= 0 && this.activeSequence.itemsIds[currentItemId + 1])  {
      return this.router.navigate(['answer', this.activeSequence.id, this.activeSequence.itemsIds[currentItemId + 1]]);
    }
  }

}
