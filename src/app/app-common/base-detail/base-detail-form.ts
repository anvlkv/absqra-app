import { BaseDetail, OnItemSet } from './base-detail';
import { BaseDetailService } from './base-detail-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentDynamicStates } from '../dynamic-state/dynamic-state.component';
import { Base } from 'models/api-models';
import { formDeltaValue } from '../../utils';


export interface FieldMapper {
  [propName: string]: any & ((value?: any) => any) & FieldMapper;
}

export abstract class BaseDetailForm<T extends Base, P extends BaseDetailService<T>> extends BaseDetail<T, P> implements OnInit, OnDestroy, OnItemSet {

  public dataItemForm: FormGroup;

  private formValuesSubscription: Subscription;

  protected get formDeltaValue () {
    return formDeltaValue(this.dataItemForm);
  }

  constructor(
    dataItemService: P,
    public fb: FormBuilder,
    shouldFetchDefault = true
  ) {
    super(dataItemService, shouldFetchDefault);
  }


  private setFormGroup() {
    this.dataItemForm = this.fb.group(
      this.generateFormGroup(
        cleanUpBaseForForm(this.dataItem || this.defaultItem)
      )
    );

    this.formValuesSubscription = this.dataItemForm.valueChanges.subscribe(value => {
      this.dataItem = {
        // @ts-ignore
        ...this.dataItem,
        ...this.formDeltaValue
      };
    });
  }

  protected generateFormGroup(data) {
    const output = {};
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (data[prop] instanceof Array) {
          output[prop] = this.fb.array(data[prop].map(this.generateFormGroup.bind(this)));
        }
        else if (typeof data[prop] === 'object') {
          output[prop] = this.fb.group(this.generateFormGroup(data[prop]));
        }
        else {
          output[prop] = this.fb.control(data[prop]);
        }
      }
    }

    return output;
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.dataItemId && !this.dataItem) {
      this.dataItemService.fetchDefault().subscribe((d) => {
        this.dataItem = d;
        this.setFormGroup();
        this.$state.next(ComponentDynamicStates.EDITING);
      });
    }
    else if (this.dataItem) {
      this.$state.next(ComponentDynamicStates.EDITING);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.formValuesSubscription ? this.formValuesSubscription.unsubscribe() : null;
  }

  bdOnItemSet(loaded: boolean): void {
    if (this.dataItemForm) {
      const value = cleanUpBaseForForm(this.dataItem);

      for (const prop in value) {
        if (value.hasOwnProperty(prop)) {
          if (!this.dataItemForm.contains(prop)) {
            let formGroup: any = {};
            formGroup[prop] = value[prop];
            formGroup = this.generateFormGroup(formGroup);
            this.dataItemForm.addControl(prop, formGroup[prop]);
          }
        }
      }

      this.dataItemForm.patchValue(value);
    }
    else {
      this.setFormGroup();
    }

    if (!loaded) {
      this.edit();
    }
  }

  edit(event?: Event) {
    event ? event.preventDefault() : null;

    this.$state.next(ComponentDynamicStates.EDITING);
  }

  save(event?: Event) {
    event ? event.preventDefault() : null;

    if (this.dataItemForm.valid) {
      if (this.dataItemId) {
        this.dataItemService.update(this.dataItem);
      }
      else {
        this.dataItemService.save(this.dataItem);
      }
    }
  }

  reset(event?: Event) {
    event ? event.preventDefault() : null;
    this.dataItemForm.reset(this.dataItemService.dataItem);
  }
}

function cleanUpBaseForForm<T extends Base>(data: T): Partial<T> {
  if (!data || typeof data !== 'object') {
    return data;
  }
  const {
    createdDate,
    updatedDate,
    id,
    // @ts-ignore
    ...partialData
  }: T = data;

  Object.keys(partialData).forEach(prop => {
    if (partialData[prop] instanceof Array) {
      partialData[prop] = partialData[prop].map(v => cleanUpBaseForForm(v));
    }
    else if (typeof partialData[prop] === 'object') {
      partialData[prop] = cleanUpBaseForForm(partialData[prop]);
    }
  });

  return partialData;
}
