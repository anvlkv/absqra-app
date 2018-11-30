import { ApiService, CRUD } from '../api-service/api.service';
import { CallConfig } from 'models/call-config';
import * as jsonpatch from 'fast-json-patch';
import { Operation } from 'fast-json-patch';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Base } from 'models/api-models';
import * as _ from 'lodash';
import { ComponentDynamicStates, DynamicState } from '../dynamic-state/dynamic-state.component';


export abstract class BaseDetailService<T extends Base> {
  public dataItem: T;
  public dataItemId: string;
  public defaultItem: T;
  public dataItemObservable: Observable<T>;
  public dataItemIdObservable: Observable<string>;
  public itemState: Observable<DynamicState>;

  public parentId: string;

  protected dataItemPristine: T;

  private dataItem$: ReplaySubject<T>;
  private itemState$: BehaviorSubject<DynamicState>;
  private dataItemId$: ReplaySubject<string>;

  abstract callConfigurator(itemId: string, cause: CRUD, item?: T): CallConfig;

  constructor(
    public api: ApiService
  ) {
    this.itemState$ = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
    this.itemState = this.itemState$.asObservable();

    this.dataItem$ = new ReplaySubject<T>(1);
    this.dataItemObservable = this.dataItem$.asObservable();

    this.dataItemId$ = new ReplaySubject<string>(1);
    this.dataItemIdObservable = this.dataItemId$.asObservable();

    this.dataItemObservable.subscribe(d => {
      this.dataItem = d;
      this.dataItemPristine = _.cloneDeep(d);
      this.itemState$.next(ComponentDynamicStates.VIEWING);
    });

    this.dataItemIdObservable.subscribe(id => {
      this.dataItemId = id;
    });
  }

  private configureCall(cause: CRUD): CallConfig {
    return this.callConfigurator(this.dataItemId, cause, this.dataItem);
  }

  private handleError(err) {
    this.itemState$.next({state: ComponentDynamicStates.FAILING, err});
  }

  fetchDefault(): Observable<T> {
    const callConfig = this.callConfigurator('default', CRUD.READ);
    const call = this.api.getData<T>(callConfig.route, callConfig.params, callConfig.query);
    call.subscribe(d => {
      this.defaultItem = d;

      if (!this.dataItemId && !this.dataItem) {
        this.itemState$.next(ComponentDynamicStates.EMPTY);
      }

    }, this.handleError.bind(this));
    return call;
  }

  fetch(id: string): Observable<T> {
    this.dataItemId = id;
    const callConfig = this.configureCall(CRUD.READ);
    const call = this.api.getData<T>(callConfig.route, callConfig.params, callConfig.query);
    call.subscribe(d => {
      this.dataItem$.next(d);
      this.itemState$.next(ComponentDynamicStates.VIEWING);
    }, this.handleError.bind(this));
    return call;
  }

  save(dataItem: T): Observable<T> {
    this.itemState$.next(ComponentDynamicStates.INTERIM);
    const callConfig = this.configureCall(this.dataItemId ? CRUD.UPDATE : CRUD.CREATE);
    const call = this.api.postData<T>(callConfig.route, callConfig.params, dataItem, callConfig.query);
    call.subscribe(d => {
      this.dataItem$.next(d);
      this.dataItemId$.next(d.id);
      this.itemState$.next(ComponentDynamicStates.VIEWING);
    }, this.handleError.bind(this));
    return call;
  }

  update(dataItem: T): Observable<T> {
    this.itemState$.next(ComponentDynamicStates.INTERIM);
    const callConfig = this.configureCall(CRUD.UPDATE);
    let patch: Operation[];
    patch = jsonpatch.compare(this.dataItemPristine, dataItem);
    const call = this.api.patchData<T>(callConfig.route, callConfig.params, patch, callConfig.query);
    call.subscribe(d => {
      this.dataItem$.next(d);
      this.itemState$.next(ComponentDynamicStates.VIEWING);
    }, this.handleError.bind(this));
    return call;
  }

  remove(): Observable<T> {
    this.itemState$.next(ComponentDynamicStates.INTERIM);
    const callConfig = this.configureCall(CRUD.DELETE);
    const call = this.api.deleteData<T>(callConfig.route, callConfig.params, callConfig.query);
    call.subscribe(deleted => {
      this.dataItem = null;
      this.dataItemId$.next(null);
      this.itemState$.next(ComponentDynamicStates.DELETED);
    }, this.handleError.bind(this));
    return call;
  }

  restore(): Observable<T> {
    return this.save(this.dataItemPristine);
  }
}
