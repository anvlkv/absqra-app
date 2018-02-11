import { Component, EventEmitter, forwardRef, Input, NgZone, OnInit, Output } from '@angular/core';
import { Asset } from '../../../models/Asset';
import { Step } from '../../../models/Step';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { ResponseBody } from 'models/response';


export const STEP_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StepInputComponent),
  multi: true,
};

@Component({
  selector: 'app-step-input',
  templateUrl: './step-input.component.html',
  styleUrls: ['./step-input.component.scss'],
  providers: [STEP_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class StepInputComponent implements ControlValueAccessor {
  @Input() asset: Asset;
  @Input() step: Step;
  inputType: string;

  @Output() stepResponseChange: EventEmitter<any> = new EventEmitter();


  private innerValue: any;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input()
  get stepResponse(): any {
    try {
      return JSON.parse(JSON.stringify(this.innerValue));
    } catch (e) {
      return this.innerValue;
    }
  };


  set stepResponse(v: any) {
    if (v !== this.innerValue && v) {
      let oldVal, newVal;
      oldVal = this.innerValue;
      newVal = v;
      this.innerValue = v;
      this.onChangeCallback(v);
      this.stepResponseChange.emit(this.innerValue);
    }
  }

  constructor(
    private zone: NgZone
  ) {

  }


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


  addItem() {
    const newItem = new ResponseBody({response: ''});
    this.stepResponse = this.innerValue ? [...this.innerValue, newItem] : [newItem];
    return false;
  }

  removeItem(index) {
    const val = [...this.innerValue];
    val.splice(index, 1);
    this.stepResponse = val;
  }

  onkeypress(e) {
    if (e.key === 'Enter' && this.innerValue[this.innerValue.length - 1].response) {

      this.addItem();

      return false;
    }
  }
}
