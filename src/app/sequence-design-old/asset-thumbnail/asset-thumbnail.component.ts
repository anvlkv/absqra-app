import { Component, Input, OnInit } from '@angular/core';
import { AssetBase } from '../../../api-models';

@Component({
  selector: 'app-asset-thumbnail',
  templateUrl: './asset-thumbnail.component.html',
  styleUrls: ['./asset-thumbnail.component.scss']
})
export class AssetThumbnailComponent implements OnInit {
  @Input()
  asset: AssetBase;

  constructor() { }

  ngOnInit() {
  }

}
