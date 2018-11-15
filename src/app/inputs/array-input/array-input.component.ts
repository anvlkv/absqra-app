import {
  ChangeDetectorRef,
  Component, ContentChild, ElementRef,
  forwardRef,
  Input, OnChanges,
  OnDestroy,
  QueryList, SimpleChanges,
  TemplateRef, ViewChildren,
} from '@angular/core';
import { Sortable } from 'models/sortable';
import {
  AbstractControl,
  ControlValueAccessor, FormArray, FormBuilder, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, noop, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, skipUntil} from 'rxjs/operators';
import { cloneDeep} from 'lodash';


export enum AddAt {
  START = 'start',
  END = 'end'
}

export const ARRAY_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ArrayInputComponent),
  multi: true,
};

export const ARRAY_INPUT_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ArrayInputComponent),
  multi: true,
};

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
  providers: [ARRAY_INPUT_CONTROL_VALUE_ACCESSOR, ARRAY_INPUT_VALIDATORS],
})
export class ArrayInputComponent implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
  private focusedOrder: number;
  private onTouchedCallback: Function = noop;
  private onChangeCallback: Function = noop;
  private onValidatorChangeCallback: Function = noop;
  private formArrayUpdateInProgress: BehaviorSubject<boolean>;
  private formArrayValueSubscription: Subscription;


  @Input() reflectOrderInProperty: string;
  @Input() trackByProperty = 'id';
  @Input() orderable = true;
  @Input() addAt: AddAt | number = AddAt.END;
  @Input() orderShift = 1;
  @Input() itemName = 'item';
  @Input() disabled: boolean;
  @Input() formArray: FormArray;
  @Input() maxItems: number;
  @Input() minItems = 0;

  @ContentChild(TemplateRef)
  @Input()
  public itemTemplate: TemplateRef<any>;

  @ViewChildren('itemOrder')
  orderInputsList: QueryList<ElementRef<HTMLInputElement>>;



  private _archetype: any;
  get archetype(): any {
    return typeof this._archetype === 'function' ? this._archetype() : cloneDeep(this._archetype);
  }
  @Input()
  set archetype(v: any) {
    this._archetype = v;
  }

  protected sortableItems: Sortable<any>[] = [];
  get value(): any[] {
    if (this.formArray) {
      return this.formArray.value;
    }

    return this.sortableItems.map((item) => {
      item = setOrder(item, this.reflectOrderInProperty);
      return item.item;
    });
  }
  @Input()
  set value(items: any[]) {
    this.writeValue(items);
  }

  addAtTypes = AddAt;
  virtualArray_Controls: Observable<AbstractControl[]>;

  constructor(
    private fb: FormBuilder,
    private ch: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formArray && changes.formArray.currentValue) {
      this.formArrayValueSubscription ? this.formArrayValueSubscription.unsubscribe() : null;
      this.formArrayUpdateInProgress = new BehaviorSubject<boolean>(true);

      const controlsSubj = new BehaviorSubject(this.formArray.controls);

      this.virtualArray_Controls = controlsSubj.pipe(
        skipUntil(this.formArrayUpdateInProgress.pipe(map(v => !v))),
      );


      this.formArrayValueSubscription = this.formArray.valueChanges.pipe(
        skipUntil(this.formArrayUpdateInProgress.pipe(map(v => !v))),
      ).subscribe(() => {
        this.formArrayUpdateInProgress.next(true);
        controlsSubj.next(this.formArray.controls);
        this.formArrayUpdateInProgress.next(false);
      });

      if (!this.archetype) {
        const archetype = this.archetype;
        this.archetype = () => this.fb.control(archetype);
      }

      this.formArray.setAsyncValidators(() => {
        return this.formArrayUpdateInProgress.pipe(
          filter(inProgress => !inProgress),
          map(() => this.validate()),
          distinctUntilChanged()
        );
      });

      this.formArrayUpdateInProgress.next(false);
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

  }

  ngOnDestroy(): void {
    this.formArrayValueSubscription ? this.formArrayValueSubscription.unsubscribe() : null;
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

  trackByFn(index: number, sortable: Sortable<any>) {
    return sortable.order;
  }

  onBlur(order: number) {
    this.focusedOrder = order;
    this.onTouchedCallback(this.value);
  }

  onFocus(order: number) {
    this.focusedOrder = order;
    this.onTouchedCallback(this.value);
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

    while (this.sortableItems.length > items.length) {
      this.sortableItems.splice(this.sortableItems.length - 1, 1);
    }

    this.sortableItems.forEach((oldItem, at) => {
      this.sortableItems[at].item = items[at];
      this.sortableItems[at].order = at + this.orderShift;
    });

    if (this.sortableItems.length < items.length) {
      this.sortableItems.push(...items.slice(
        this.sortableItems.length,
        items.length,
      ).map((item, at) => ({
        order: this.sortableItems.length + at + this.orderShift,
        item,
        onBlur: this.onBlur.bind(this),
        onFocus: this.onFocus.bind(this),
        onOrderChange: this.reorderItems.bind(this),
      })));
    }

    this.ch.detectChanges();

    this.onChangeCallback(this.value);
  }

  addItem(e?, at = this.addAt) {
    e ? e.preventDefault() : null;
    const currentVal = this.value;

    switch (at) {
      case AddAt.END: {
        currentVal.push(this.archetype);
        break;
      }
      case AddAt.START: {
        currentVal.splice(0, 0, this.archetype);
        break;
      }
      default: {
        currentVal.splice(at, 0, this.archetype);
        break;
      }
    }

    this.value = currentVal;
  }

  removeItem(order: number, e?) {
    e ? e.preventDefault() : null;
    const currentVal = this.value;
    currentVal.splice(order - this.orderShift, 1);
    this.value = currentVal;
  }

  reorderItems(newOrder: number, oldOrder: number) {
    const currentVal = this.value;
    const oldIndex = oldOrder - this.orderShift;
    let newIndex = newOrder - this.orderShift;
    const orderInputsList = this.orderInputsList.toArray();
    const shouldRefocus = this.focusedOrder === oldOrder;
    if (shouldRefocus) {
      orderInputsList[oldIndex].nativeElement.blur();
    }
    newIndex = newIndex >= 0 ? newIndex : currentVal.length + newIndex;
    if (newIndex < currentVal.length && newOrder >= this.orderShift) {
      currentVal.splice(newIndex, 0, currentVal.splice(oldIndex, 1)[0]);
      this.value = currentVal;
      if (shouldRefocus) {
        orderInputsList[newIndex].nativeElement.focus();
      }
      orderInputsList[newIndex].nativeElement.value = `${newOrder}`;
      orderInputsList[oldIndex].nativeElement.value = `${oldOrder}`;
    }
    else {
      orderInputsList[oldIndex].nativeElement.value = `${oldOrder}`;
      if (shouldRefocus) {
        orderInputsList[oldIndex].nativeElement.focus();
      }
    }
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

  onVirtualArrayChanges(controls: AbstractControl[]) {
    if (this.formArrayUpdateInProgress.getValue()) {
      return;
    }
    this.formArrayUpdateInProgress.next(true);


    while (this.formArray.length > controls.length) {
      this.formArray.removeAt(this.formArray.length - 1);
    }

    controls.forEach((control, at) => {
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

function setOrder(sortable, orderProperty?) {
  if (orderProperty) {
    sortable.item[orderProperty] = sortable.order;
  }
  return sortable;
}
