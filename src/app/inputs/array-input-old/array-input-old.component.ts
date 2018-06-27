import {
  ChangeDetectorRef,
  Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnInit, Output, TemplateRef, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { Sortable } from '../../../models/sortable';
import { ResponseBody } from '../../../api-models/responseBody';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { AddAt } from '../array-input/array-input.component';


// export interface ArrayInputItemArchetype {
//   [prop: string]: any
// }

export const ARRAY_INPUT_OLD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ArrayInputOldComponent),
  multi: true
};


@Component({
  selector: 'app-array-input-old',
  templateUrl: './array-input-old.component.html',
  styleUrls: ['./array-input-old.component.scss'],
  providers: [ARRAY_INPUT_OLD_CONTROL_VALUE_ACCESSOR]
})
export class ArrayInputOldComponent implements OnInit, ControlValueAccessor {
  @Input() archetype: any;
  @Input() reflectOrder: string;
  @Input() tackByItemProperty = 'id';
  @Input() orderable = true;
  @Input() addAt: AddAt = AddAt.END;
  addAtTypes = AddAt;

  // @Output() change = new EventEmitter<any[]>();

  @ContentChild(TemplateRef)
  public itemTemplate: TemplateRef<any>;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  private _innerValue: Sortable<any>[] = [];
  private _oldValue: Sortable<any>[] = [];

  private innerValue: Observable<Sortable<any>[]>;
  private $subj = new Subject<Sortable<any>[]>();

  get value(): any[] {
    return this._innerValue.map((item, index) => {
      item = this.setOrder(item);
      return item.item
    }).filter(item => item.hasOwnProperty(this.tackByItemProperty));
  };
  set value(v: any[]) {
    if (v) {
      this._oldValue = _.cloneDeep(this.value);
      this.$subj.next(
        v.map((item, index) => {
          return this.setOrder({order: index + 1, item});
        }
      ));
    }
  }


  constructor(
    private zone: NgZone
  ) {
    this.innerValue = this.$subj.asObservable();
  }

  private innerValueSubscriber(v) {
    const oldVal = this._oldValue;
    this._innerValue = v;
    this.zone.run(() => {
      const currentVal = [...this.value];
      // if (!_.isEqual(oldVal, currentVal)) {
      this.onChangeCallback(this.value);
        // this.change.emit(this.value);
      // }
    });
  }

  trackByFn(index: number, sortable: Sortable<any>): string {
    if (sortable.item[this.tackByItemProperty]) {
      return String(sortable.item[this.tackByItemProperty])
    }
    return `itemAt_${sortable.order}`;
  }

  private setOrder(sortable) {
    if (this.reflectOrder) {
      sortable.item[this.reflectOrder] = sortable.order
    }
    return sortable;
  }

  ngOnInit() {
    this.innerValue.subscribe(this.innerValueSubscriber.bind(this));

    if (this.archetype && !this.value.length) {
      this.addItem();
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.addItem(e);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: ResponseBody[]) {
    this.value = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  addItem(e?) {
    this.onTouchedCallback();
    e ? e.preventDefault() : null;

    const currentVal = [...this.value];
    if (this.addAt == AddAt.END) {
      currentVal.push({...this.archetype});
    }
    else {
      currentVal.splice(0, 0, {...this.archetype});
    }


    // this.$subj.next(currentVal);
    this.writeValue(currentVal);
  }

  removeItem(at: number, e?) {
    this.onTouchedCallback();
    e ? e.preventDefault() : null;
    const currentVal = [...this.value];
    at--;

    currentVal.splice(at, 1);

    this.writeValue(currentVal);
    // this.change.emit(this.value);
  }

  onOrderChanged(newPosition: number, oldPosition: number, e) {
    this.onTouchedCallback();
    if (!newPosition || !oldPosition) {
      return;
    }
    else {
      e.target.blur();
    }

    const oldIndex = oldPosition - 1, newIndex = newPosition - 1;


    const currentVal = [...this.value];

    currentVal.splice(newIndex, 0, currentVal.splice(oldIndex, 1)[0]);

    this.writeValue(currentVal);
  }

}
