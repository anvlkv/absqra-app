import { Component, ContentChild, forwardRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Sortable } from '../../../models/sortable';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import * as _ from 'lodash';
import { noop } from 'rxjs';

export enum AddAt {
  START,
  END
}

export const ARRAY_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ArrayInputComponent),
  multi: true
};

export const ARRAY_INPUT_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ArrayInputComponent),
  multi: true
};

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
  providers: [ARRAY_INPUT_CONTROL_VALUE_ACCESSOR, ARRAY_INPUT_VALIDATORS]
})
export class ArrayInputComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() archetype: any;
  @Input() reflectOrderInProperty: string;
  @Input() orderable = true;
  @Input() addAt: AddAt = AddAt.END;
  @Input() orderShift = 1;

  @ContentChild(TemplateRef)
  public itemTemplate: TemplateRef<any>;

  private _min: number;
  get min(): number {
    return this._min;
  }
  @Input()
  set min(min: number) {
    this._min = min;
    this.onValidatorChangeCallback();
  }

  private _max: number;
  get max(): number {
    return this._max;
  }
  @Input()
  set max (max: number){
    this._max = max;
    this.onValidatorChangeCallback();
  }

  addAtTypes = AddAt;
  sortableItems: Sortable<any>[] = [];


  get value(): any[] {
    return this.sortableItems.map((item) => {
      item = setOrder(item, this.reflectOrderInProperty);
      return item.item
    })
  }

  @Input()
  set value(items: any[]) {
    this.writeValue(items);
  }

  private focused: any;
  private onTouchedCallback: Function = noop;
  private onChangeCallback: Function = noop;
  private onValidatorChangeCallback: Function = noop;
  private disabled: boolean;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(value: any[]) {
    this.value = value;
  }

  onBlur(value: any[]) {
    this.focused = null;
    this.onTouchedCallback(value);
  }

  onFocus(value: any) {
    this.focused = value;
    this.onTouchedCallback(value);
  }

  onOrderKeydown(e: KeyboardEvent, order) {
    switch (e.code) {
      case 'ArrowUp': {
        e.preventDefault();
        this.reorderItems(order - 1, order);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        this.reorderItems(order + 1, order);
        break;
      }
      default: {
        return e;
      }
    }
  }

  writeValue(items: any[]): void {
    items = items || [];
    this.sortableItems = items.map((item, i) => {
      return <Sortable<any>> {
        order: i + this.orderShift,
        item,
        onBlur: this.onBlur.bind(this),
        onFocus: this.onFocus.bind(this),
        onChange: this.onChange.bind(this)
      }
    });
    this.onChangeCallback(items);
  }

  addItem(e?) {
    e ? e.preventDefault() : null;
    const currentVal = [...this.value];

    if (this.max <= currentVal.length) {
      return;
    }

    if (this.addAt == AddAt.END) {
      currentVal.push(_.cloneDeep(this.archetype));
    }
    else {
      currentVal.splice(0, 0, _.cloneDeep(this.archetype));
    }
    this.value = currentVal;
  }

  removeItem(order: number, e?) {
    e ? e.preventDefault() : null;
    const currentVal = [...this.value];

    if (this.min >= currentVal.length) {
      return;
    }

    currentVal.splice(order - this.orderShift, 1);
    this.value = currentVal;
  }

  reorderItems(newOrder: number, oldOrder: number, e?) {
    e ? e.target.blur() : null;
    const currentVal = [...this.value];
    const oldIndex = oldOrder - this.orderShift;
    let newIndex = newOrder - this.orderShift;
    newIndex = newIndex >= 0 ? newIndex : currentVal.length + newIndex;
    currentVal.splice(newIndex, 0, currentVal.splice(oldIndex, 1)[0]);
    this.value = currentVal;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeCallback = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};

    if (this.min && this.value.length < this.min) {
      errors.min = true;
    }

    if (this.max && this.value.length > this.max) {
      errors.max = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
}

function setOrder(sortable, orderProperty?) {
  if (orderProperty) {
    sortable.item[orderProperty] = sortable.order
  }
  return sortable;
}
