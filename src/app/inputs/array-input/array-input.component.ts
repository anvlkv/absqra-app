import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { InputTypes } from '../default-input/default-input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { Sortable } from '../../../models/sortable';
import { ResponseBody } from '../../../api-models/responseBody';


export interface ArrayInputItemArchetype extends ResponseBody {
  type: InputTypes
}

export const ARRAY_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ArrayInputComponent),
  multi: true
};

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
  providers: [ARRAY_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ArrayInputComponent implements OnInit, ControlValueAccessor {
  @Input() archetype: ArrayInputItemArchetype = {content: null, origin: null, type: InputTypes.text, isOriginal: true};

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  private _innerValue: Sortable<ResponseBody>[] = [];
  @Input()
  get value(): ResponseBody[] {
    return this._innerValue.map(s => s.item);
  };
  set value(v: ResponseBody[]) {
    if (v) {
      this._innerValue = v.map((item, index) => {return {order: index + 1, item}});
      this.onChangeCallback(v);
    }
  }

  static trackByFn(index: number, sortable: Sortable<ResponseBody>) {
    return index;
  }

  constructor(
  ) { }

  ngOnInit() {
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

  // onChange(e) {
  //   this.value = {
  //     ...this.value,
  //     content: this._innerValue.content
  //   }
  // }

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
    e ? e.preventDefault() : null;

    const currentVal = [...this.value];
    currentVal.push({
      content: this.archetype.content,
      isOriginal: this.archetype.isOriginal,
      origin: this.archetype.origin
    });

    this.writeValue(currentVal);
    this.onTouchedCallback();
  }

  removeItem(at: number, e?) {
    e ? e.preventDefault() : null;
    const currentVal = [...this.value];
    at--;

    currentVal.splice(at, 1);

    this.writeValue(currentVal);
    this.onTouchedCallback();
  }

  onOrderChanged(newPosition: number, oldPosition: number) {
    if (!newPosition || !oldPosition) {
      return;
    }

    newPosition--;
    oldPosition--;

    const currentVal = [...this.value];
    const itemToReplace = currentVal[newPosition];
    const item = currentVal[oldPosition];

    currentVal[oldPosition] = itemToReplace;
    currentVal[newPosition] = item;

    this.writeValue(currentVal);
    this.onTouchedCallback();
    // console.table(this.value);
  }

}
