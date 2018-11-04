import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Base } from 'models/api-models';
import { ComponentDynamicStates, DynamicState, stateCombinator } from '../dynamic-state/dynamic-state.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BaseDetailService } from './base-detail-service';


export abstract class BaseDetail <T extends Base> implements OnInit, OnDestroy, OnChanges {

  protected $state: BehaviorSubject<DynamicState>;

  private itemSubscription: Subscription;

  state: Observable<DynamicState>;
  defaultItem = <T>{};

  @Input()
  dataItemId: string;
  @Output()
  dataItemIdChange = new EventEmitter<string>(true);

  @Input()
  dataItem: T;

  abstract bdOnItemSet?(loaded: boolean): void;

  constructor(
    public dataItemService: BaseDetailService<T>,
    private shouldFetchDefault = true
  ) {
    this.$state = new BehaviorSubject<DynamicState> (ComponentDynamicStates.LOADING);
    this.state = stateCombinator(
      this.dataItemService.itemState,
      this.$state.asObservable()
    );
  }


  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.itemSubscription = this.dataItemService.dataItemObservable.subscribe(d => {
      this.dataItem = d;
      if (this.dataItemId !== d.id) {
        this.dataItemId = d.id;
        this.bdOnItemSet ? this.bdOnItemSet(true) : null;
        this.dataItemIdChange.emit(this.dataItemId);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataItemId) {
      if (this.dataItemId && this.dataItemId !== changes.dataItemId.previousValue) {
        this.dataItemService.fetch(this.dataItemId);
      }
      else if (this.shouldFetchDefault && !this.dataItem) {
        this.dataItemService.fetchDefault().subscribe(d => {
          this.dataItem = d;
          this.$state.next(ComponentDynamicStates.EDITING);
          this.bdOnItemSet ? this.bdOnItemSet(false) : null;
        });
      }
      else if (!this.dataItem) {
        this.$state.next(ComponentDynamicStates.EMPTY);
      }
    }

    if (changes.dataItem) {
      if (this.dataItem) {
        this.$state.next(ComponentDynamicStates.VIEWING);
      }
      else if (!this.shouldFetchDefault && !this.dataItemId) {
        this.$state.next(ComponentDynamicStates.EMPTY);
      }
    }
  }

}


export interface OnItemSet {
  bdOnItemSet(loaded: boolean): void;
}

function cleanUpBaseForForm<T extends Base>(data: T): Partial<T> {
  if (!data) {
    return data;
  }
  const {
    createdDate,
    updatedDate,
    // @ts-ignore
    ...partialData
  }: T = data;

  Object.keys(partialData).forEach(prop => {
    if (partialData[prop] instanceof Array) {
      partialData[prop] = partialData[prop].map(v => cleanUpBaseForForm(v))
    }
    else if (typeof partialData[prop] === 'object') {
      partialData[prop] = cleanUpBaseForForm(partialData[prop])
    }
  });

  return partialData;
}
