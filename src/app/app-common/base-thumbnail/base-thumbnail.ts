import { Base } from 'models/api-models';
import {
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentDynamicStates } from '../dynamic-state/dynamic-state.component';
import { map } from 'rxjs/operators';


export abstract class BaseThumbnail <T extends Base> implements OnChanges, OnDestroy {
  @Input()
  dataItem: Partial<T>;

  $state = new BehaviorSubject<ComponentDynamicStates>(ComponentDynamicStates.EMPTY);

  public state: Observable<boolean>;
  constructor(
  ) {
    this.state = this.$state.pipe(map(s => s === ComponentDynamicStates.VIEWING));
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataItem && changes.dataItem.currentValue) {
      this.$state.next(ComponentDynamicStates.VIEWING);
    }
    else if (!this.dataItem) {
      this.$state.next(ComponentDynamicStates.EMPTY);
    }
  }

  ngOnDestroy() {
    this.$state.closed = true;
  }

}
