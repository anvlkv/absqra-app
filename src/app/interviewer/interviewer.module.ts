import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceEditorComponent } from './sequence-editor/sequence-editor.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {interviewerRoutes} from './interviewer.routes';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { ItemThumbnailComponent } from './item-thumbnail/item-thumbnail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(interviewerRoutes)
  ],
  declarations: [SequenceEditorComponent, ItemEditorComponent, DashboardComponent, ItemThumbnailComponent]
})
export class InterviewerModule {
}
