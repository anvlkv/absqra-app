import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Base } from '../../../models/api-models';
import { BaseDetailService } from './base-detail-service';
import { BaseDetailForm } from './base-detail-form';
import { filter } from 'rxjs/operators';
import { ComponentDynamicStates } from '../dynamic-state/dynamic-state.component';
import { Subscription } from 'rxjs';

export abstract class BaseDetailFormControl <T extends Base, P extends BaseDetailService<T>> extends BaseDetailForm<T, P> implements ControlValueAccessor, Validator, OnDestroy {
  private onChangeSubscriptions: Subscription[] = [];
  private onTouchedSubscriptions: Subscription[] = [];
  protected disabled: boolean;

  ngOnDestroy() {
    super.ngOnDestroy();
    this.onChangeSubscriptions.forEach(s => s ? s.unsubscribe() : null);
    this.onTouchedSubscriptions.forEach(s => s ? s.unsubscribe() : null);
  }

  registerOnChange(fn: any): void {
    this.onChangeSubscriptions.push(
      this.dataItemService.dataItemObservable.subscribe(v => fn(v))
    );
  }

  registerOnTouched(fn: any): void {
    this.onTouchedSubscriptions.push(
      this.state.pipe(
        filter(s => s === ComponentDynamicStates.EDITING)
      ).subscribe(() => fn())
    );
  }

  registerOnValidatorChange(fn: () => void): void {
    this.dataItemForm.statusChanges.subscribe(() => fn());
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.dataItemForm.disable() : this.dataItemForm.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.dataItemForm.errors;
  }

  writeValue(obj: T): void {
    this.dataItemForm.setValue(obj);
  }

}
