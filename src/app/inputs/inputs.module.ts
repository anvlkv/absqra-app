import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInputComponent } from './list-input/list-input.component';
import { SelectMultipleInputComponent } from './select-multiple-input/select-multiple-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ListInputComponent,
    SelectMultipleInputComponent
  ],
  exports: [
    ListInputComponent,
    SelectMultipleInputComponent
  ]
})
export class InputsModule { }
