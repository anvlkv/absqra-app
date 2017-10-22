import { Component, forwardRef } from '@angular/core';
import { SelectMultipleInputComponent } from '../select-multiple-input/select-multiple-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Asset } from '../../models/asset';

interface SelectableAsset extends Asset {
  _originalIndex: number;
}

@Component({
  selector: 'app-select-single-input',
  templateUrl: './select-single-input.component.html',
  styleUrls: ['./select-single-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSingleInputComponent),
      multi: true
    }
  ]
})
export class SelectSingleInputComponent extends SelectMultipleInputComponent {

}
