import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrayInputDemoComponent } from './array-input-demo/array-input-demo.component';
import { MultipleInputDemoComponent } from './multiple-input-demo/multiple-input-demo.component';
import { DynamicOptionsDemoComponent } from './dynamic-options-demo/dynamic-options-demo.component';

const routes: Routes = [
  {
    path: 'array-input',
    component: ArrayInputDemoComponent
  },
  {
    path: 'multiple-input',
    component: MultipleInputDemoComponent
  },
  {
    path: 'dynamic-options',
    component: DynamicOptionsDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevPlaygroundRoutingModule { }
