import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultInputComponent } from './default-input/default-input.component';
import { ArrayInputComponent } from './array-input/array-input.component';
import { ObjectInputComponent } from './object-input/object-input.component';
import { MultipleInputComponent } from './multiple-input/multiple-input.component';
import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from '../old/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DefaultInputComponent,
    ArrayInputComponent,
    ObjectInputComponent,
    MultipleInputComponent,
    AutoFocusDirective
  ],
  exports: [
    DefaultInputComponent,
    ArrayInputComponent,
    ObjectInputComponent,
    MultipleInputComponent
  ]
})
export class InputsModule { }

export enum AppInputs {
  DefaultInputComponent = 'app-default-input',
  ArrayInputComponent = 'app-array-input',
  ObjectInputComponent = 'app-object-input',
  MultipleInputComponent = 'app-multiple-input'
}
