import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceResponseRoutingModule } from './sequence-response-routing.module';
import { TopSequenceExecutorComponent } from './top-sequence-executor/top-sequence-executor.component';
import { StepExecutorComponent } from './step-executor/step-executor.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { QuestionExecutorComponent } from './question-executor/question-executor.component';
import { TaskExecutorComponent } from './task-executor/task-executor.component';
import { StaticContentComponent } from './sr/static-content/static-content.component';
import { InputComponent } from './sr/input/input.component';
import { LargeTextComponent } from './sr/large-text/large-text.component';
import { RadioButtonsComponent } from './sr/radio-buttons/radio-buttons.component';
import { CheckBoxesComponent } from './sr/check-boxes/check-boxes.component';
import { SelectComponent } from './sr/select/select.component';
import { ListInputComponent } from './sr/list-input/list-input.component';
import { YesNoComponent } from './sr/yes-no/yes-no.component';
import { ResponseService } from './sr/response.service';
import { AssetViewerComponent } from './asset-viewer/asset-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SequenceResponseRoutingModule,
    ReactiveFormsModule,
    InputsModule
  ],
  declarations: [
    TopSequenceExecutorComponent,
    StepExecutorComponent,
    QuestionExecutorComponent,
    TaskExecutorComponent,
    StaticContentComponent,
    InputComponent,
    LargeTextComponent,
    RadioButtonsComponent,
    CheckBoxesComponent,
    SelectComponent,
    ListInputComponent,
    YesNoComponent,
    AssetViewerComponent
  ],
  providers: [
    ResponseService
  ]
})
export class SequenceResponseModule { }
