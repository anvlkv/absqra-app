import { Component } from '@angular/core';
import { AssetContentTypes, AssetTypes, AssetBase } from 'models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';


@Component({
  selector: 'app-asset-thumbnail',
  templateUrl: './asset-thumbnail.component.html',
  styleUrls: ['./asset-thumbnail.component.scss']
})
export class AssetThumbnailComponent extends BaseThumbnail<AssetBase> {
  assetTypes = AssetTypes;
  contentTypes = AssetContentTypes;
}
