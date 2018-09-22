import { Component, ContentChild, forwardRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { noop } from 'rxjs';
import { Selectable, SelectionState } from 'models/selectable';
import * as _ from 'lodash';


let instanceCount = 0;

export const MULTIPLE_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultipleInputComponent),
  multi: true
};

export const MULTIPLE_INPUT_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MultipleInputComponent),
  multi: true
};

@Component({
  selector: 'app-multiple-input',
  templateUrl: './multiple-input.component.html',
  styleUrls: ['./multiple-input.component.scss'],
  providers: [MULTIPLE_INPUT_CONTROL_VALUE_ACCESSOR, MULTIPLE_INPUT_VALIDATORS]
})
export class MultipleInputComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  instanceNumber: number;

  @ContentChild(TemplateRef)
  public itemTemplate: TemplateRef<any>;

  private _min: number;
  @Input()
  set min(min: number) {
    this._min = min;
    this.onValidatorChangeCallback();
  }
  get min(): number {
    return this._min;
  }

  private _max: number;
  @Input()
  set max (max: number){
    this._max = max;
    this.onValidatorChangeCallback();
  }
  get max(): number {
    return this._max;
  }

  selectableOptions: Selectable<any>[] = [];
  @Input()
  set options(opts: any[]){
    if (opts && !areOptionSetsEqual(opts, this.options)) {
      this.selectableOptions = opts.map(o => ({
        item: o,
        state: this.getOptionState(o)
      }));

      this.onChangeCallback(this.value);
    }
    else {
      this.selectableOptions = [];
      this.value = [];
    }
  }
  get options(): any[] {
    return this.selectableOptions.map(o => o.item)
  }

  @Input()
  set value(items: any[] & any) {
    if (!(items instanceof Array)) {
      items = [items];
    }
    this.writeValue(items);
  }
  get value(): any[] & any {
    const val = this.selectableOptions.filter(o => o.state === SelectionState.ON).map(o => o.item);
    return this.multiSelect ? val : val[0]
  }

  @Input()
  multiSelect = true;

  selectionStates = SelectionState;

  private focused: any;
  private onTouchedCallback: Function = noop;
  private onChangeCallback: Function = noop;
  private onValidatorChangeCallback: Function = noop;
  private disabled: boolean;

  constructor(
  ) {
    instanceCount ++;
    this.instanceNumber = instanceCount;
  }

  private getOptionState(opt: any): SelectionState {
    const selectableOption = this.selectableOptions.find(s => _.isEqual(opt, s.item));
    if (selectableOption) {
      return selectableOption.state;
    }
    return SelectionState.OFF;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onCheckboxChanged(event: Event, at: number) {
    const input = (<HTMLInputElement>event.target);
    if (!this.max ||
      !input.checked ||
      this.value.length < this.max) {
      this.selectableOptions[at].state = input.checked ?
        SelectionState.ON :
        input.indeterminate ?
          SelectionState.IND : SelectionState.OFF;

      this.writeValue(this.value);
    }
    else {
      this.onTouchedCallback();
    }
  }

  onRadioChanged(event: Event, at: number) {
    this.writeValue([this.selectableOptions[at].item]);
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

  onBlur(value: any[]) {
    this.focused = null;
    this.onTouchedCallback(value);
  }

  onFocus(value: any) {
    this.focused = value;
    this.onTouchedCallback(value);
  }

  writeValue(selected: any[]): void {
    if (typeof selected === 'string') {
      selected = [selected];
    }
    selected = selected || [];

    const options = this.options;
    const selectedIndexes = selected.map(opt => options.findIndex(o => _.isEqual(opt, o)));
    this.selectableOptions.forEach((opt, index) => {
      opt.state = selectedIndexes.includes(index) ? SelectionState.ON : SelectionState.OFF;
    });

    this.onChangeCallback(this.value);
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

function areOptionSetsEqual(x: any[], y: any[]): boolean {
  return _(x).differenceWith(y, _.isEqual).isEmpty();
}
