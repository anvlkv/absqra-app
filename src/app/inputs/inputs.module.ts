import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInputComponent } from './list-input/list-input.component';
import { SelectMultipleInputComponent } from './select-multiple-input/select-multiple-input.component';
import { FormsModule } from '@angular/forms';
import { SelectSingleInputComponent } from './select-single-input/select-single-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { UrlInputComponent } from './url-input/url-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ListInputComponent,
    SelectMultipleInputComponent,
    SelectSingleInputComponent,
    TextInputComponent,
    FileInputComponent,
    UrlInputComponent
  ],
  exports: [
    ListInputComponent,
    SelectMultipleInputComponent,
    SelectSingleInputComponent
  ]
})
export class InputsModule { }
