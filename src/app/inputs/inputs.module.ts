import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultInputComponent } from './default-input/default-input.component';
import { ArrayInputComponent } from './array-input/array-input.component';
import { MultipleInputComponent } from './multiple-input/multiple-input.component';
import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from './autofocus.directive';

const inputs = [
  DefaultInputComponent,
  ArrayInputComponent,
  MultipleInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...inputs,
    AutoFocusDirective
  ],
  exports: [
    inputs
  ]
})
export class InputsModule { }

export enum AppInputs {
  DefaultInputComponent = 'app-default-input',
  ArrayInputComponent = 'app-array-input',
  ObjectInputComponent = 'app-object-input',
  MultipleInputComponent = 'app-multiple-input'
}
