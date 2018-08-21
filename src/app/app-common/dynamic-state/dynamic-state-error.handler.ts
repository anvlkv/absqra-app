import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class DynamicStateErrorHandler extends ErrorHandler {
  private errorState$: Subject<any>;
  public error: Observable<any>;

  constructor() {
    super();
    this.errorState$ = new Subject<any>();
    this.error = this.errorState$.asObservable();
  }
  handleError(err) {
    this.errorState$.next(err);
  }
}
