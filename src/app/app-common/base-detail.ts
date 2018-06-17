import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataService, ReFetchQuery } from './data.service';
import { ComponentDynamicStates } from './dynamic-state/dynamic-state.component';
import { Base } from '../../api-models';
import { ApiRoute, CRUD, RouteParams } from './api.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/index';
import * as _ from 'lodash';

export interface CallConfig {
  route: ApiRoute,
  params?: RouteParams,
  query?: RouteParams,
  refetch?: ReFetchQuery[]
}


export abstract class BaseDetail<T extends Base> implements OnInit, OnDestroy {

  private _dataItemId: number;

  get dataItemId(): number {
    return this._dataItemId;
  }
  @Input()
  set dataItemId(id: number) {
    if (id) {
      this._dataItemId = id;
      if (!this.dataItem) {
        this.fetchDataItem();
      }
    }
  }

  private _dataItem: T;
  @Input()
  set dataItem(item: T) {
    if (item) {
      this._dataItem = item;
      if (item.id) {
        this._dataItemId = item.id;
      }
      this.fetchDataItem();
    }
  }
  get dataItem(): T {
    return this._dataItem;
  }
  @Output() dataItemChange = new EventEmitter<T>(true);

  @Input() callConfigurator: (item: T, cause: CRUD) => CallConfig;

  @Input() defaultItemIfNone: boolean;

  $state = new BehaviorSubject<ComponentDynamicStates>(ComponentDynamicStates.LOADING);
  private itemSubscription: Subscription;
  private idSubscription: Subscription;

  itemBaseValidator: (item: T) => boolean;
  dataItemIdObservableSource?: () => Observable<number>
  currentState: ComponentDynamicStates;

  constructor(
    public data: DataService,
  ) {
    this.$state.asObservable().subscribe(s => {
      if (s == ComponentDynamicStates.EDITING && !this.dataItem) {
        this._dataItem = <T>{};
      }
    });
  }

  private itemSubscriber(item: T): void {
    const oldState = this.currentState;
    const oldItem = _.cloneDeep(this.dataItem);
    this.dataItem = item;
    this.$state.next(ComponentDynamicStates.VIEWING);

    if (oldState !== ComponentDynamicStates.LOADING &&
      !_.isEqual(oldItem, this.dataItem)
    ) {

      // console.log(_.reduce(oldItem, function(result, value, key) {
      //   return _.isEqual(value, item[key]) ?
      //     result : result.concat(key);
      // }, []));

      this.dataItemChange.emit(item);
    }
  }

  private errorSubscriber(e): void {
    this.$state.next(ComponentDynamicStates.FAILING);
  }

  ngOnInit(): void {
    this.$state.asObservable().subscribe(s => {
      this.currentState = s
    });

    if (!this.dataItemId && this.dataItem) {
      this.$state.next(ComponentDynamicStates.EDITING);
    }
    else {
      this.fetchDataItem(this.defaultItemIfNone);
    }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }

    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
  }

  fetchDataItem(fallbackToDefault = false): void {
    if (this.dataItemId && !this.dataItem) {
      const readConfig = this.callConfigurator(null, CRUD.READ);
      this.itemSubscription = this.data.getData<T>(readConfig.route, readConfig.params, readConfig.query).subscribe(this.itemSubscriber.bind(this), this.errorSubscriber.bind(this));
    }
    else if (this.dataItem && !this.dataItem.id || (this.itemBaseValidator && !this.itemBaseValidator(this.dataItem))) {
      this.$state.next(ComponentDynamicStates.EDITING);
    }
    else if (this.dataItem) {
      this.$state.next(ComponentDynamicStates.VIEWING);
    }
    else if (this.dataItemIdObservableSource) {
      this.idSubscription =  this.dataItemIdObservableSource().subscribe(id => this.dataItemId = id);
    }
    else if (fallbackToDefault) {
      const defaultValueConfig = this.callConfigurator(null, CRUD.READ);
      const defaultSubscription = this.data.getData<T>(defaultValueConfig.route, defaultValueConfig.params, defaultValueConfig.query).subscribe((item) => {
        // console.log(item);
        this.dataItem = item;
        defaultSubscription.unsubscribe();
      }, this.errorSubscriber.bind(this));
    }
  }

  saveDataItem(): void {
    if (this.itemBaseValidator && !this.itemBaseValidator(this.dataItem)) {
      throw Error(`attempting to save invalid item`);
    }

    if (this.itemSubscription) {
      const updateConfig = this.callConfigurator(this.dataItem, CRUD.UPDATE);
      this.data.postData<T>(updateConfig.route, updateConfig.params, this.dataItem, updateConfig.query, ...updateConfig.refetch);
    }
    else {
      const createConfig = this.callConfigurator(this.dataItem, CRUD.CREATE);
      this.itemSubscription = this.data.postData<T>(createConfig.route, createConfig.params, this.dataItem, createConfig.query, ...createConfig.refetch).subscribe(this.itemSubscriber.bind(this), this.errorSubscriber.bind(this));
    }
  }

}
