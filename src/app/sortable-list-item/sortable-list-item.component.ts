import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NgForm } from '@angular/forms';

import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';


export const SORTABLE_LIST_ITEM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SortableListItemComponent),
  multi: true
};

@Component({
  selector: 'app-sortable-list-item',
  templateUrl: './sortable-list-item.component.html',
  styleUrls: ['./sortable-list-item.component.scss'],
  providers: [SORTABLE_LIST_ITEM_CONTROL_VALUE_ACCESSOR]
})
export class SortableListItemComponent implements ControlValueAccessor {
  @Input() maxOrder: number;
  @Input() minOrder = 1;

  @Output() orderChanged: EventEmitter<[number, number]> = new EventEmitter();

  // The internal data model
  private innerValue = 0;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  };

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue && v) {
      let oldVal, newVal;
      oldVal = this.innerValue;
      newVal = v;
      this.innerValue = v;
      this.onChangeCallback(v);
      this.orderChanged.emit([oldVal, newVal]);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
