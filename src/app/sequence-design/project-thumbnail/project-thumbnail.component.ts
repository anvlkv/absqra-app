import { Component } from '@angular/core';
import { Project } from 'models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';

@Component({
  selector: 'app-project-thumbnail',
  templateUrl: './project-thumbnail.component.html',
  styleUrls: ['./project-thumbnail.component.scss']
})
export class ProjectThumbnailComponent extends BaseThumbnail<Project> {
}
