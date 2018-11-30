import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevPlaygroundRoutingModule } from './dev-playground-routing.module';
import { AppCommonModule } from '../app-common/app-common.module';
import { DataModule } from '../data/data.module';
import { InputsModule } from '../inputs/inputs.module';
import { ArrayInputDemoComponent } from './array-input-demo/array-input-demo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultipleInputDemoComponent } from './multiple-input-demo/multiple-input-demo.component';
import { DynamicOptionsDemoComponent } from './dynamic-options-demo/dynamic-options-demo.component';

@NgModule({
  declarations: [ArrayInputDemoComponent, MultipleInputDemoComponent, DynamicOptionsDemoComponent],
  imports: [
    CommonModule,
    DevPlaygroundRoutingModule,
    AppCommonModule,
    InputsModule,
    ReactiveFormsModule
  ]
})
export class DevPlaygroundModule { }
