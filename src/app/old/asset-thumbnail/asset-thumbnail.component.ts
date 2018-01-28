import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../../models/asset';

@Component({
  selector: 'app-asset-thumbnail',
  templateUrl: './asset-thumbnail.component.html',
  styleUrls: ['./asset-thumbnail.component.scss']
})
export class AssetThumbnailComponent implements OnInit {
  @Input() asset: Asset;

  constructor() { }

  ngOnInit() {
  }

}
