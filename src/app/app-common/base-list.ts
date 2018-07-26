import { ComponentDynamicStates, DynamicState } from './dynamic-state/dynamic-state.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/index';
import { Input, OnDestroy, OnInit } from '@angular/core';
import { Step } from '../../api-models/step';
import { DataService } from './data-service/data.service';
import { FormControl } from '@angular/forms';
import { Base } from '../../api-models';
import { CRUD } from './api.service';
import { CallConfig } from './call-config';


export abstract class BaseList<T extends Base, P extends Base> implements OnInit, OnDestroy {

  $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  listState: Observable<DynamicState>;

  @Input()
  dataItems: T[];

  private _sourceItemId: number;
  archetype: Partial<T>;
  @Input()
  set step (itemId: number) {
    if (itemId) {
      this._sourceItemId = itemId;
      this.fetchItems();
    }
  }

  @Input()
  set sourceItemId (id: number) {
    this._sourceItemId = id;
    this.fetchItems();
  }
  get sourceItemId (): number {
    return this._sourceItemId;
  }

  private itemsSubscription: Subscription;
  private parentItemSubscription: Subscription;

  sourceItemRelationName: string;

  @Input() callConfigurator: (items: T[], cause: CRUD) => CallConfig;
  @Input() parentCallConfigurator: (item: P, cause: CRUD) => CallConfig;
  @Input() archetypeRetriever: () => Observable<T>;

  private parentItem: P;
  constructor(
    public data: DataService,
  ) {
    this.listState = this.$state.asObservable();
  }

  ngOnInit() {
    if (this.archetypeRetriever) {
      this.archetypeRetriever().subscribe(a => this.archetype = a);
    }
    this.fetchItems();
  }

  ngOnDestroy() {
    this.itemsSubscription ? this.itemsSubscription.unsubscribe() : null;
    this.parentItemSubscription ? this.parentItemSubscription.unsubscribe() : null;
  }

  fetchItems() {
    this.$state.next(ComponentDynamicStates.LOADING);
    if (!this.dataItems) {
      const itemsCallConfig = this.callConfigurator(this.dataItems, CRUD.READ);
      this.itemsSubscription = this.data.getData<T[]>(itemsCallConfig.route, itemsCallConfig.params, itemsCallConfig.query).subscribe(items => {
        this.dataItems = items;
        this.$state.next(ComponentDynamicStates.VIEWING);
      }, err => {
        this.$state.next({state: ComponentDynamicStates.FAILING, err});
      });
    }
    else if (this.dataItems) {
      this.$state.next(ComponentDynamicStates.VIEWING);
    }

    if (this.parentCallConfigurator) {
      const parentCallConfig = this.parentCallConfigurator(null, CRUD.READ);
      this.parentItemSubscription = this.data.getData<P>(parentCallConfig.route, parentCallConfig.params, parentCallConfig.query).subscribe(parent =>  this.parentItem = parent);
    }
  }

  onItemsChange(input: FormControl, e?) {
    const body = <P>{};
    body[this.sourceItemRelationName] = this.dataItems;
    if (this.sourceItemId &&
      (this.dataItems.every(d => !!d.id) || !this.dataItems.length)) {
      const sourceItemCallConfig = this.parentCallConfigurator(body, CRUD.UPDATE)
      this.data.postData<P>(sourceItemCallConfig.route, sourceItemCallConfig.params, body, sourceItemCallConfig.query).subscribe(r => {
        console.log(r);
      });
    }
  }

  onSingleItemChanged(itemsInput: FormControl, newItemValue, atIndex: number) {
    const currentVal = this.dataItems[atIndex];
    this.dataItems[atIndex] = newItemValue;
    if (!currentVal || currentVal.id !== newItemValue.id) {
      this.onItemsChange(itemsInput);
    }
  }
}
