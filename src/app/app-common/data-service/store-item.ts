import { Observable, ReplaySubject } from 'rxjs';
import { RequestParams } from 'api';
import { mergeMap } from 'rxjs/operators';

export class DataStoreItem<T> {
  requestParams: RequestParams;
  private _inFlight: Observable<T>;
  set inFlight (observable: Observable<T>) {
    // if (observable) {
    this._inFlight = observable;
    // }
  }
  get inFlight(): Observable<T> {
    return this._inFlight.pipe(mergeMap(d => {
      this.subject$.next(d);
      return this.subject$.asObservable();
    }));
  }
  subject$: ReplaySubject<T>;

  private _tempId: string;
  get tempId(): string {
    return this._tempId;
  }
  set tempId(id: string) {
    if (!this.permanentId) {
      this._tempId = id;
    }
    else if (id) {
      throw new Error(`item [${this.permanentId}] already has permanent id, cannot set temp id [${id}]`);
    }
  }

  private _permanentId: string;
  get permanentId(): string {
    return this._permanentId;
  }
  set permanentId(id: string) {
    if (id) {
      delete this._tempId;
      this._permanentId = id;
    }
  }

  constructor(
    data?: T
  ) {
    this.subject$ = new ReplaySubject<T>(1);

    if (data) {
      this.subject$.next(data);
    }
  }
}
