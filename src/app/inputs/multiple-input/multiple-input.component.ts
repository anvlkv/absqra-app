import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import * as _ from 'lodash';
import { ResponseBody } from '../../../api-models/responseBody';


export const MULTIPLE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultipleInputComponent),
  multi: true,
};

export enum MultipleInputTypes {
  checkbox = 'checkbox',
  radio = 'radio',
  select = 'select'
}

interface MultipleInputResponseBody {
  value: ResponseBody;
  selected: ResponseBody;
  isOther: boolean;
}

@Component({
  selector: 'app-multiple-input',
  templateUrl: './multiple-input.component.html',
  styleUrls: ['./multiple-input.component.scss'],
  providers: [MULTIPLE_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class MultipleInputComponent implements OnInit, ControlValueAccessor {
  MultipleInputTypes = MultipleInputTypes;
  @Input() min: number;
  @Input() max: number;
  @Input() name: string;
  @Input() type: MultipleInputTypes;


  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  private _innerValue: ResponseBody[];
  private _options: MultipleInputResponseBody[];

  @Input()
  get value(): ResponseBody[]{
    return this._innerValue || [];
  }
  set value(v: ResponseBody[]) {
    if (v) {
      this._innerValue = [...v];
      this.onChangeCallback(v);
    }
  }


  @Input()
  set options(o: ResponseBody[]) {
    if (o) {
      this._options = o.map(opt => {
        return {
          value: opt,
          selected: {content: this.isOptionSelected(opt), origin: opt.origin, isOriginal: opt.isOriginal },
          isOther: false,
        };
      });
      this.onTouchedCallback();
    }
  }


  isOptionSelected(option: ResponseBody): boolean {
    if (this.value) {
      return !!this.value.find(r => _.isEqual(r, option));
    }
  }

  writeValue(v: ResponseBody[]): void {
    this.value = v;
  }

  onSelectionChanged(e: Event, option: MultipleInputResponseBody) {
    const currentValue = [...this.value];
    const state = (<HTMLInputElement>e.target).checked;
    if (state && !this.isOptionSelected(option.value)) {
      currentValue.push(option.value)
    }
    else if (!state && this.isOptionSelected(option.value)) {
      const selectedIndex = currentValue.findIndex(o => _.isEqual(o, option.value))
      currentValue.splice(selectedIndex, 1);
    }
    this.writeValue(currentValue);
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  constructor() { }

  ngOnInit() {

  }

}
