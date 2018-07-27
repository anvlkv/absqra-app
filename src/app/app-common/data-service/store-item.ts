import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { RequestParams } from 'api';
import { filter, mergeMap } from 'rxjs/operators';
import getPrototypeOf = Reflect.getPrototypeOf;

export class DataStoreItem<T> {
  requestParams: RequestParams;
  inFlight: Observable<T>;
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
