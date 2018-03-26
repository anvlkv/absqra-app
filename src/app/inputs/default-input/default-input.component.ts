import {
  Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnInit, Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { ResponseBody } from '../../../models/response';

export const DEFAULT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultInputComponent),
  multi: true
};

export enum InputTypes {
  text = 'text',
  longText = 'textarea',
  email = 'email',
  number = 'number',
  url = 'url',
  color = 'color',
  checkbox = 'checkbox',
  date = 'date',
  file = 'file',
  radio = 'radio',
  tel = 'tel',
  time = 'time'
}

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss'],
  providers: [DEFAULT_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DefaultInputComponent implements OnInit, ControlValueAccessor {
  InputTypes = InputTypes;
  @Input() type: InputTypes = InputTypes.text;
  @Input() min: number;
  @Input() max: number;
  @Input() label: string;
  @Input() name: string;
  @Output() keyup: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();


  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  private _innerValue = new ResponseBody({response: null});

  @Input()
  get value(): ResponseBody{
    return this._innerValue;
  };
  set value(v: ResponseBody) {
    if (v) {
      this._innerValue = v;
      this.onChangeCallback(v);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  onBlur() {
    this.onTouchedCallback();
  }

  onChange(e) {
    this.value = {
      ...this.value,
      response: this._innerValue.response
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: ResponseBody) {
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

  onKeyDown(e) {
    this.keyup.emit(e);
  }

}

// enum valueOrCheckedAttr {
//   value,
//   checked
// }

// function shouldChangeElementValueOrCheckedAttr(type): valueOrCheckedAttr {
//   switch (type) {
//     case InputTypes.checkbox:
//     case InputTypes.radio:
//       return valueOrCheckedAttr.checked;
//     default:
//       return valueOrCheckedAttr.value;
//   }
// }
