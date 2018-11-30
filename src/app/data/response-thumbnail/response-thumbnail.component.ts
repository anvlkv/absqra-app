import { Component, OnInit } from '@angular/core';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';
import { SequenceResponse } from 'models/api-models';

@Component({
  selector: 'app-response-thumbnail',
  templateUrl: './response-thumbnail.component.html',
  styleUrls: ['./response-thumbnail.component.scss']
})
export class ResponseThumbnailComponent extends BaseThumbnail<SequenceResponse> {}
