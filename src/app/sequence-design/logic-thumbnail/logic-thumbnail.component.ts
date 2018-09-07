import { Component } from '@angular/core';
import { Logic } from 'models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';

@Component({
  selector: 'app-logic-thumbnail',
  templateUrl: './logic-thumbnail.component.html',
  styleUrls: ['./logic-thumbnail.component.scss', '../styles/sequence-design.scss']
})
export class LogicThumbnailComponent extends BaseThumbnail<Logic> {
}
