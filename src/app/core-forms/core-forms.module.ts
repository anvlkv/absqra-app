import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from './base-form/base-form.component';
import { ListInputComponent } from './list-input/list-input.component';
import { YesNoInputComponent } from './yes-no-input/yes-no-input.component';
import { PortalFormComponent } from './portal-form/portal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingStateComponent } from '../old/loading-state/loading-state.component';
import { FormsSchemaService } from './forms-schema.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BaseFormComponent,
    ListInputComponent,
    YesNoInputComponent,
    PortalFormComponent,
    // TODO: moove it to separate module soon
    LoadingStateComponent
  ],
  exports: [
    BaseFormComponent,
    ListInputComponent,
    YesNoInputComponent,
    PortalFormComponent
  ],
  providers: [
    FormsSchemaService
  ]
})
export class CoreFormsModule { }
