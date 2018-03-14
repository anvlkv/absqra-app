import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormsSchemaService, InputConfig } from '../forms-schema.service';


@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})
export class ListInputComponent {
  @Input()
  orderedList?: boolean;

  private _min = 1;
  get min(): number {
    return this._min;
  }
  @Input()
  set min(min) {
    this._min = min;
    if (this.formGroup) {
      this.addMissingItems();
    }
  }

  @Input()
  max?: number;

  @Input()
  itemConfig: InputConfig;

  @Input()
  formArrayName: string;

  private _fg: FormGroup;
  get formGroup(): FormGroup {
    return this._fg;
  }

  @Input()
  set formGroup(fg) {
    if (fg) {
      this._fg = fg;
      this.addMissingItems();
    }
  };

  get formArray(): FormArray {
    return <FormArray>this.formGroup.controls[this.formArrayName];
  }
  set formArray(fa) {
    this.formGroup.setControl(this.formArrayName, fa);
  }


  constructor(
    private fs: FormsSchemaService
  ) { }

  addMissingItems() {
    while (this.itemCountDelta(0) > 0 && this.min) {
      this.addItem(0);
    }
  }

  addItem(at, e?) {
    e ? e.preventDefault() : null;

    if (this.validateItemCount(1)) {
      this.formArray.insert(at, this.fs.buildFormGroup({inputs: [{
          ...this.itemConfig,
          name: at.toString()
        }]}).controls[at.toString()]);
    }
  }

  removeItem(at, e?) {
    e ? e.preventDefault() : null;
    if (this.validateItemCount(-1)) {
      this.formArray.removeAt(at);
    }
  }

  itemCountDelta(projected = 0): number {
    const itemCount = this.formArray.length + projected;
    let result = 0;
    if (!this.validateItemCount(projected)) {
      if (this.max && this.max < itemCount) {
        result = this.max - itemCount;
      }

      if (this.min && this.min > itemCount) {
        result = this.min - itemCount;
      }
    }

    return result;
  }

  validateItemCount(projected = 0): boolean {
    let result = true;
    const itemCount = this.formArray.length + projected;

    if (this.max) {
      result = itemCount <= this.max;
    }

    if (this.min && result && projected <= 0) {
      result = itemCount >= this.min;
    }

    return result;
  }

}
