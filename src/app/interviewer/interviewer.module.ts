import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssetEditorComponent } from './asset-editor/asset-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { interviewerRoutes } from './interviewer.routes';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { ItemThumbnailComponent } from './item-thumbnail/item-thumbnail.component';
import { SequenceEditorComponent } from './sequence-editor/sequence-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(interviewerRoutes)
  ],
  declarations: [
    SequenceEditorComponent,
    ItemEditorComponent,
    DashboardComponent,
    ItemThumbnailComponent,
    AssetEditorComponent
  ]
})
export class InterviewerModule {
}
