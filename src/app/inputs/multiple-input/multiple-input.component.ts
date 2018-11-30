import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input, OnChanges,
  OnDestroy,
  OnInit, Optional,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, noop, Observable, Subscription } from 'rxjs';
import { Selectable, SelectionState } from 'models/selectable';
import { isEqual, differenceWith } from 'lodash';
import { distinctUntilChanged, filter, map, skipUntil } from 'rxjs/operators';
import { controlValueAccessorProviderGenerator, validatorProviderGenerator } from '../../utils';


let instanceCount = 0;


@Component({
  selector: 'app-multiple-input',
  templateUrl: './multiple-input.component.html',
  styleUrls: ['./multiple-input.component.scss'],
  providers: [controlValueAccessorProviderGenerator(MultipleInputComponent), validatorProviderGenerator(MultipleInputComponent)],
})
export class MultipleInputComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, Validator {
  private formArrayValueSubscription: Subscription;
  private formArrayUpdateInProgress: BehaviorSubject<boolean>;
  private virtualArray_Controls: Observable<AbstractControl[]>;
  private focused: any;
  private onTouchedCallback: Function = noop;
  private onChangeCallback: Function = noop;
  private onValidatorChangeCallback: Function = noop;
  private disabled: boolean;
  private selection$: BehaviorSubject<AbstractControl[]> = new BehaviorSubject<AbstractControl[]>([]);
  private controls$: BehaviorSubject<(AbstractControl | FormControl)[]>;

  readonly instanceNumber: number;

  @ContentChild(TemplateRef)
  @Input()
  public itemTemplate: TemplateRef<any>;


  get options(): any[] {
    return this.selectableOptions.map(o => o.item);
  }
  @Input()
  set options(opts: any[]) {
    if (opts && !areOptionSetsEqual(opts, this.options)) {
      this.selectableOptions = opts.map(o => ({
        item: o,
        state: this.getOptionState(o),
      }));

      this.onChangeCallback(this.value);

      if (this.controls$) {
        this.controls$.next(this.controlOptionMapper());
        this.ch.detectChanges();
      }
    }
  }


  get value(): any[] & any {
    if (this.formArray) {
      return this.formArray.value;
    }

    const val = this.selectableOptions.filter(o => o.state === SelectionState.ON).map(o => o.item);
    return this.multiSelect ? val : val[0];
  }
  @Input()
  set value(items: any[] & any) {
    if (!(items instanceof Array)) {
      items = [items];
    }
    this.writeValue(items);
  }


  @Input() multiSelect = true;
  @Input() formArray: FormArray;
  @Input() maxItems: number;
  @Input() minItems: number;

  selectionStates = SelectionState;
  selectableOptions: Selectable<any>[] = [];
  virtualArraySelection: Observable<AbstractControl[]>;

  constructor(
    private ch: ChangeDetectorRef,
    @Optional() private fb: FormBuilder
  ) {
    instanceCount ++;
    this.instanceNumber = instanceCount;
  }

  private getOptionState(opt: any): SelectionState {
    const selectableOption = this.selectableOptions.find(s => {
      if ((opt || s.item) instanceof AbstractControl) {
        return isEqual(opt.value, s.item.value);
      }
      return isEqual(opt, s.item);
    });
    if (selectableOption) {
      return selectableOption.state;
    }
    return SelectionState.OFF;
  }

  private controlOptionMapper() {
    return this.options.map(opt => {
      if (opt instanceof AbstractControl || !this.formArray) {
        return opt;
      }
      return this.fb.control(opt);
    });
  }

  ngOnInit() {
    if (!this.controls$) {
      this.controls$ = new BehaviorSubject(this.controlOptionMapper());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && changes.options.currentValue && this.controls$) {
      this.controls$.next(this.controlOptionMapper());
    }

    if (changes.formArray && changes.formArray.currentValue) {
      this.formArrayValueSubscription ? this.formArrayValueSubscription.unsubscribe() : null;
      this.formArrayUpdateInProgress = new BehaviorSubject<boolean>(true);
      if (!this.controls$) {
        this.controls$ = new BehaviorSubject(this.controlOptionMapper());
      }
      this.virtualArray_Controls = this.controls$.pipe(
        // skipUntil(this.formArrayUpdateInProgress.pipe(map(v => !v))),
      );

      this.virtualArraySelection = this.selection$.pipe(
        skipUntil(this.formArrayUpdateInProgress.pipe(map(v => !v))),
        map(controls => {
          return controls.sort((a, b) => {
            const aIndex = this.options.findIndex(opt => isEqual(opt, a.value));
            const bIndex = this.options.findIndex(opt => isEqual(opt, b.value));
            return aIndex > bIndex ? 1 : -1;
          });
        })
      );

      this.selection$.next(this.formArray.controls);

      this.formArrayValueSubscription = this.formArray.valueChanges.pipe(
        skipUntil(this.formArrayUpdateInProgress.pipe(map(v => !v))),
      ).subscribe(() => {
        this.formArrayUpdateInProgress.next(true);
        this.selection$.next(this.formArray.controls);
        this.formArrayUpdateInProgress.next(false);
        this.ch.detectChanges();
      });


      this.formArray.setAsyncValidators(() => {
        return this.formArrayUpdateInProgress.pipe(
          filter(inProgress => !inProgress),
          map(() => this.validate()),
          distinctUntilChanged()
        );
      });


      this.formArrayUpdateInProgress.next(false);
      this.ch.detectChanges();
    }

    if (changes.minItems && changes.minItems.currentValue ||
      changes.maxItems && changes.maxItems.currentValue) {
      this.onValidatorChangeCallback();
      if (this.formArray) {
        if (this.validate() || this.formArray.errors) {
          this.formArray.updateValueAndValidity();
        }
      }
    }

    if (changes.multiSelect && changes.multiSelect.currentValue !== changes.multiSelect.previousValue) {
      this.onChangeCallback(this.value);
    }
  }

  ngOnDestroy(): void {
    this.formArrayValueSubscription ? this.formArrayValueSubscription.unsubscribe() : null;
    this.controls$.complete();
    this.selection$.complete();
  }

  onCheckboxChanged(event: Event, at: number) {
    const input = (<HTMLInputElement>event.target);
    this.selectableOptions[at].state = input.checked ?
      SelectionState.ON :
      input.indeterminate ?
        SelectionState.IND : SelectionState.OFF;

    this.writeValue(this.value);
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
    const selectedIndexes = selected.map(opt => options.findIndex(o => {
      if ((opt || o) instanceof AbstractControl) {
        return isEqual(opt.value, o.value);
      }
      return isEqual(opt, o);
    }));
    this.selectableOptions.forEach((opt, index) => {
      opt.state = selectedIndexes.includes(index) ? SelectionState.ON : SelectionState.OFF;
    });

    this.onChangeCallback(this.value);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeCallback = fn;
  }

  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    if (this.minItems && this.value.length < this.minItems) {
      errors.min = true;
    }

    if (this.maxItems && this.value.length > this.maxItems) {
      errors.max = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  onVirtualArraySelectionChanges(selectedControls: AbstractControl[]) {
    if (this.formArrayUpdateInProgress.getValue()) {
      return;
    }
    this.formArrayUpdateInProgress.next(true);


    while (this.formArray.length > selectedControls.length) {
      this.formArray.removeAt(this.formArray.length - 1);
    }

    selectedControls.forEach((control, at) => {
      if (this.formArray.at(at)) {
        this.formArray.setControl(at, control);
      }
      else {
        this.formArray.insert(at, control);
      }
    });
    this.formArrayUpdateInProgress.next(false);
  }
}

function areOptionSetsEqual(x: any[], y: any[]): boolean {
   const notEqual = x.length !== y.length || differenceWith(x, y, (a, b) => {
    if ((a || b) instanceof FormControl || (a || b) instanceof FormGroup || (a || b) instanceof FormArray) {
      return isEqual(a.value, b.value);
    }
    return isEqual(a, b);
  }).length !== 0;
  return !notEqual;
}
