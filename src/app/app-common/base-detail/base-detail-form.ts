import { BaseDetail, OnItemSet } from './base-detail';
import { BaseDetailService } from './base-detail-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentDynamicStates } from '../dynamic-state/dynamic-state.component';


export abstract class BaseDetailForm<T> extends BaseDetail<T> implements OnInit, OnDestroy, OnItemSet {
  public dataItemForm: FormGroup;

  private formValuesSubscription: Subscription;

  formControlsTransformers: {
    [controlName: string]: (value: any) => any
  } = {};

  constructor(
    dataItemService: BaseDetailService<T>,
    public fb: FormBuilder,
    shouldFetchDefault = true
  ) {
    super(dataItemService, shouldFetchDefault);
  }

  private generateFormGroup() {
    this.dataItemForm = this.fb.group(this.dataItem || this.defaultItem);
    this.formValuesSubscription = this.dataItemForm.valueChanges.subscribe(v => {
      for (const controlName in this.formControlsTransformers) {
        if (v[controlName]) {
          v[controlName] = this.formControlsTransformers[controlName](v);
        }
      }
      this.dataItem = v
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.generateFormGroup();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.formValuesSubscription.unsubscribe();
  }

  bdOnItemSet(loaded: boolean): void {
    if (this.dataItemForm) {
      this.dataItemForm.setValue(this.dataItem);
    }
    else {
      this.generateFormGroup();
    }

    if (!loaded) {
      this.edit();
    }
  }

  edit() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  save() {
    if (this.dataItemForm.valid) {
      this.dataItemService.save(this.dataItem)
    }
  }

  reset() {
    this.dataItemForm.reset(this.dataItemService.dataItem);
  }
}
