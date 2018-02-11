import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseContentItemComponent } from './base-content-item/base-content-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BaseContentItemComponent
  ],
  exports: [
    BaseContentItemComponent
  ]
})
export class CoreContentModule { }
