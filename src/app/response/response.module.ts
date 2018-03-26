import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseRoutingModule } from './response-routing.module';
import { SequenceComponent } from './sequence/sequence.component';
import { ItemComponent } from './item/item.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';
import { ResponseService } from '../api/response.service';
import { ApiModule } from '../api/api.module';

@NgModule({
  imports: [
    CommonModule,
    ResponseRoutingModule,
    FormsModule,
    InputsModule
  ],
  declarations: [
    SequenceComponent,
    ItemComponent,
    ProgressComponent
  ],
  providers: [
    ResponseService
  ]
})
export class ResponseModule { }
