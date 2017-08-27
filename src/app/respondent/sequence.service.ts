import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Sequence } from "../sequence";

@Injectable()
export class SequenceService {
  private subjectSequence = new Subject<Sequence>();

  sequence$ = this.subjectSequence.asObservable();

  setSequence(s: Sequence){
    this.subjectSequence.next(s);
  }

}
