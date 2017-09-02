import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInputComponent } from './list-input/list-input.component';
import { SelectMultipleInputComponent } from './select-multiple-input/select-multiple-input.component';
import { FormsModule } from '@angular/forms';
import { SelectSingleInputComponent } from './select-single-input/select-single-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ListInputComponent,
    SelectMultipleInputComponent,
    SelectSingleInputComponent
  ],
  exports: [
    ListInputComponent,
    SelectMultipleInputComponent,
    SelectSingleInputComponent
  ]
})
export class InputsModule { }
