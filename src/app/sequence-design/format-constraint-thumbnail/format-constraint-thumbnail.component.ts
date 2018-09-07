import { Component } from '@angular/core';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';
import { FormatConstraint } from 'models/api-models';
import { getConstraintType } from '../format-constraint-detail/format-constraint-detail.component';

@Component({
  selector: 'app-format-constraint-thumbnail',
  templateUrl: './format-constraint-thumbnail.component.html',
  styleUrls: ['./format-constraint-thumbnail.component.scss', '../styles/sequence-design.scss']
})
export class FormatConstraintThumbnailComponent extends BaseThumbnail<FormatConstraint> {
  getConstraintType() {
    return getConstraintType(this.dataItem.validationType, this.dataItem.validationSubType);
  }
}
