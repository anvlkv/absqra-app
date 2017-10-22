import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Asset } from '../../models/asset';

interface SelectableAsset extends Asset {
  _originalIndex: number;
}

@Component({
  selector: 'app-select-multiple-input',
  templateUrl: './select-multiple-input.component.html',
  styleUrls: ['./select-multiple-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultipleInputComponent),
      multi: true
    }
  ]
})
export class SelectMultipleInputComponent implements OnInit, ControlValueAccessor {
  @Input() assets: Array<Asset>;
  @Input() _selectedOptions: Array<SelectableAsset> = [];
  @Input() name: string;

  // assetTypes = ItemAssetContentTypes;

  get selectedOptions(): Array<Asset> {
    return this._selectedOptions.map(o => {
      const { _originalIndex, ...asset} = o;
      return asset;
    });
  }

  set selectedOptions(val: Array<Asset>) {
    this._selectedOptions = val.map((a, i) => {
      return {
        ...a,
        _originalIndex: i
      };
    });

    this.propagateChange(this._selectedOptions);
  }

  constructor() { }

  ngOnInit() {
  }

  writeValue(val: Array<SelectableAsset> = []) {
    if (!val) {
      val = [];
    }

    this._selectedOptions = val.map(selectedAsset => {
      return {
        _originalIndex: selectedAsset._originalIndex,
        ...this.assets[selectedAsset._originalIndex]
      };
    });
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  setSelection(isChecked: boolean, i: number) {
    if (isChecked) {
      this._selectedOptions.push({
        _originalIndex: i,
        ...this.assets[i]
      });
    }
    else {
      const index = this._selectedOptions.findIndex(a => a._originalIndex === i);
      this._selectedOptions.splice(index, 1);
    }

    this.propagateChange(this._selectedOptions);
  }

  isOptionSelected(i: number) {
    return !!this._selectedOptions.find( o => o._originalIndex === i);
  }
}
