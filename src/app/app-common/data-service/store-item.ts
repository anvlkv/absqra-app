import { Observable, of, ReplaySubject } from 'rxjs';
import { RequestParams } from 'api';
import { mergeMap } from 'rxjs/operators';

export class DataStoreItem<T> {
  private _inFlight: Observable<T>;
  set inFlight (observable: Observable<T>) {
    this._inFlight = observable;
  }
  get inFlight(): Observable<T> {
    return this._inFlight.pipe(mergeMap(d => {
      if (!this.isSafeDeleted) {
        this.subject$.next(d);
        return this.subject$.asObservable();
      }
      else {
        this.latestValue = d;
        return of(d);
      }
    }));
  }
  private latestValue: T;
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

  private _isSafeDeleted: boolean;
  get isSafeDeleted(): boolean {
    return this._isSafeDeleted;
  }

  set isSafeDeleted(is: boolean) {
    this._isSafeDeleted = is;

    if (is) {
      this.subject$.complete();
      this.subject$.closed = true;
    }
    else {
      this.subject$ = new ReplaySubject<T>(this.bufferSize, this.itemExpiresIn);
      this.subject$.next(this.latestValue);
    }

  }

  constructor(
    data?: T,
    private requestParams?: RequestParams,
    private bufferSize = 1,
    private itemExpiresIn: number = undefined
  ) {
    this.subject$ = new ReplaySubject<T>(bufferSize, itemExpiresIn);

    this.subject$.subscribe(v => this.latestValue = v);

    if (data) {
      this.subject$.next(data);
    }
  }
}
