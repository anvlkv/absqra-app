import { Component, Input, OnInit } from '@angular/core';
import { Sequence } from '../../../models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';



@Component({
  selector: 'app-sequence-thumbnail',
  templateUrl: './sequence-thumbnail.component.html',
  styleUrls: ['./sequence-thumbnail.component.scss', '../styles/sequence-design.scss'],
})
export class SequenceThumbnailComponent extends BaseThumbnail<Sequence> {
}
