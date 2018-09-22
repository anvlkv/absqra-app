import {
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Base } from 'models/api-models';
import { ComponentDynamicStates, DynamicState } from '../dynamic-state/dynamic-state.component';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { DataService } from '../data-service/data.service';
import { CRUD } from '../api-service/api.service';
import { CallConfig } from 'models/call-config';
import * as jsonpatch from 'fast-json-patch';
import { Observer, Operation } from 'fast-json-patch';
import * as _ from 'lodash';
import { distinctUntilChanged } from 'rxjs/operators';


export abstract class BaseDetail <T extends Base> implements OnInit, OnDestroy, OnChanges {
  private _dataItem: T = <T>{};
  // private _dataItemId: number;
  private _dataItemPristine: T;
  private itemSubscription: Subscription;
  private $itemSet = new ReplaySubject<boolean>(1);
  protected $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  protected itemSubscriber: (item: T) => void;
  protected errorHandler: (err) => void;

  state: Observable<DynamicState>;
  itemSetObservable: Observable<boolean>;
  defaultItem = <T>{};
  callConfigurator: (itemId: string, cause: CRUD, item?: T) => CallConfig;

  @Input() dataItemId: string;

  @Output() idChange = new EventEmitter<string>(true);

  @Input()
  set dataItem(item: T) {
    if (item) {
      const oldId = this.dataItemId;
      this.dataItemId = item.id;
      if (item.id !== oldId) {
        this.idChange.emit(item.id);
      }
    }
    this._dataItem = item;
    this._dataItemPristine = _.cloneDeep(item);

    this.$itemSet.next(!!item && !!item.id);
  }
  get dataItem(): T {
    return this._dataItem;
  }

  @Input()
  parentId: number;

  constructor(
    public data: DataService
  ) {
    this.state = this.$state.asObservable();
    this.itemSetObservable = this.$itemSet.pipe(distinctUntilChanged());
    this.itemSubscriber = (item: T) => {
      this.dataItem = item;
      this.$state.next(ComponentDynamicStates.VIEWING);
    };

    this.errorHandler = (err) => {
      this.$state.next({state: ComponentDynamicStates.FAILING, err});
    };
  }

  private configureCall(cause: CRUD): CallConfig {
    return this.callConfigurator(this.dataItemId, cause, this.dataItem);
  }


  ngOnDestroy(): void {
    this.itemSubscription ? this.itemSubscription.unsubscribe() : null;
  }

  ngOnInit(): void {
    if (!this.callConfigurator) {
      throw Error(`${this.constructor.name} doesn't have a call configurator`)
    }

    if (!this.dataItemId) {
      this.fetchDefault();
    }
    else if (!this.itemSubscription) {
      this.fetch();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataItemId) {
      const id = changes.dataItemId.currentValue;
      if (!id && !this.dataItem) {
        this.$state.next(ComponentDynamicStates.EMPTY);
      }
      else if (id) {
        this.fetch();
      }
    }
  }

  fetch(): void {
    const callConfig = this.configureCall(CRUD.READ);
    this.itemSubscription ? this.itemSubscription.unsubscribe() : null;
    this.itemSubscription = this.data.getData<T>(callConfig.route, callConfig.params, callConfig.query).subscribe(this.itemSubscriber, this.errorHandler);
  }

  fetchDefault(): void {
    const callConfig = this.callConfigurator('default', CRUD.READ);
    this.data.getData<T>(callConfig.route, callConfig.params, callConfig.query).subscribe((defaultItem) => {
      this.defaultItem = defaultItem;
      
      if (!this.dataItemId) {
        this.$itemSet.next(false);
      }
    }, (err) => {
      if (!this.dataItemId) {
        this.errorHandler(err);
      }
    });
  }

  save(dataItem?: T): void {
    this.$state.next(ComponentDynamicStates.INTERIM);

    const callConfig = this.configureCall(this.dataItemId ? CRUD.UPDATE : CRUD.CREATE);
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
      patch = jsonpatch.compare(this._dataItemPristine, this.dataItem);
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
    this.dataItem = _.cloneDeep(this._dataItemPristine);
  }
}
