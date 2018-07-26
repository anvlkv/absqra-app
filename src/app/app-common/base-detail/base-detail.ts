import { EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Base } from '../../../api-models';
import { ComponentDynamicStates, DynamicState } from '../dynamic-state/dynamic-state.component';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DataService } from '../data-service/data.service';
import { CRUD } from '../api.service';
import { CallConfig } from '../call-config';
import * as jsonpatch from 'fast-json-patch';
import { Observer, Operation } from 'fast-json-patch';
import * as _ from 'lodash';


export abstract class BaseDetail <T extends Base> implements OnInit, OnDestroy {
  private _id: number;
  private _dataItem: T;
  private _dataItemPristine: T;
  private itemSubscription: Subscription;
  private $itemSet = new Subject<boolean>();
  protected $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  protected dataItemObserver: Observer<T>;
  protected itemSubscriber: (item: T) => void;
  protected errorHandler: (err) => void;

  state: Observable<DynamicState>;
  itemSetObservable: Observable<boolean>;
  defaultItem = <T>{};
  callConfigurator: (itemId: number, cause: CRUD, item?: T) => CallConfig;

  get id(): number {
    return this._id;
  }
  @Input()
  set id(id: number) {
    if (id && id != this._id) {
      this._id = id;
      this.fetch();
    }
    else if (!id && !this.dataItem) {
      this.$state.next(ComponentDynamicStates.EMPTY);
    }
  }
  @Output()
  idChange = new EventEmitter<number>(true);

  get dataItem(): T {
    return this._dataItem;
  }
  set dataItem(item: T) {
    if (item && item.id != this.id) {
      const oldId = this._id;
      this._id = item.id;
      if ((oldId && !this._id) ||
        (oldId != this._id)
      ) {
        this.idChange.emit(this._id);
      }
    }

    this._dataItem = item;
    this._dataItemPristine = _.cloneDeep(item);
    this.dataItemObserver ? this.dataItemObserver.unobserve() : null;

    if (item) {
      this.dataItemObserver = jsonpatch.observe<T>(this._dataItem);
    }

    this.$itemSet.next(!!item && !!item.id);
  }

  constructor(
    public data: DataService,
  ) {
    this.state = this.$state.asObservable();
    this.itemSetObservable = this.$itemSet.asObservable();
    this.itemSubscriber = (item: T) => {
      this.dataItem = item;
      this.$state.next(ComponentDynamicStates.VIEWING);
    };

    this.errorHandler = (err) => {
      this.$state.next({state: ComponentDynamicStates.FAILING, err});
    };
  }

  private configureCall(cause: CRUD): CallConfig {
    return this.callConfigurator(this._id, cause, this.dataItem);
  }


  ngOnDestroy(): void {
    this.itemSubscription ? this.itemSubscription.unsubscribe() : null;
    this.dataItemObserver ? this.dataItemObserver.unobserve() : null;
  }

  ngOnInit(): void {
    if (!this.callConfigurator) {
      throw Error(`${this.constructor.name} doesn't have a call configurator`)
    }

    this.$state.next(ComponentDynamicStates.LOADING);
    if (!this.id) {
      this.fetchDefault();
    }
  }

  fetch(): void {
    const callConfig = this.configureCall(CRUD.READ);
    this.itemSubscription ? this.itemSubscription.unsubscribe() : null;
    this.itemSubscription = this.data.getData<T>(callConfig.route, callConfig.params, callConfig.query).subscribe(this.itemSubscriber, this.errorHandler);
  }

  fetchDefault(): void {
    const callConfig = this.callConfigurator(0, CRUD.READ);
    this.data.getData<T>(callConfig.route, callConfig.params, callConfig.query).subscribe((defaultItem) => {
      this.defaultItem = defaultItem;
      if (!this.id) {
        this.$itemSet.next(false);
      }
    }, (err) => {
      if (!this.id) {
        this.errorHandler(err);
      }
    });
  }

  save(dataItem?: T): void {
    this.$state.next(ComponentDynamicStates.INTERIM);
    const callConfig = this.configureCall(this.id ? CRUD.UPDATE : CRUD.CREATE);
    const subscription = this.data.postData<T>(callConfig.route, callConfig.params, (dataItem || this.dataItem), callConfig.query).subscribe(this.itemSubscriber, this.errorHandler);

    if (!this.itemSubscription) {
      this.itemSubscription = subscription;
    }
  }

  update(dataItem?: T): void {
    this.$state.next(ComponentDynamicStates.INTERIM);
    const callConfig = this.configureCall(CRUD.UPDATE);
    let patch: Operation[];
    if (dataItem) {
      patch = jsonpatch.compare(this._dataItemPristine, dataItem);
    }
    else {
      patch = jsonpatch.generate(this.dataItemObserver);
    }
    this.data.patchData<T>(callConfig.route, callConfig.params, patch, callConfig.query).subscribe(this.itemSubscriber, this.errorHandler);
  }

  remove(): void {
    this.$state.next(ComponentDynamicStates.INTERIM);
    const callConfig = this.configureCall(CRUD.DELETE);
    this.data.deleteData<T>(callConfig.route, callConfig.params, callConfig.query).subscribe(deleted => {
      this.$state.next({state: ComponentDynamicStates.DELETED, deleted});
      this.dataItem = null;
    }, this.errorHandler);
  }

  edit(): void {
    if (!this.dataItem) {
      this.dataItem = _.cloneDeep(this.defaultItem);
    }
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  reset(): void {
    this.dataItem = this._dataItemPristine;
  }
}
