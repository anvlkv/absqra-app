import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowsRoutingModule } from './workflows-routing.module';
import { SequenceCrudComponent } from './sequence-crud/sequence-crud.component';

@NgModule({
  imports: [
    CommonModule,
    WorkflowsRoutingModule
  ],
  declarations: [SequenceCrudComponent]
})
export class WorkflowsModule { }
