import { Component, Input, OnInit } from '@angular/core';
import { AssetBase } from '../../../models/api-models';

@Component({
  selector: 'app-asset-viewer',
  templateUrl: './asset-viewer.component.html',
  styleUrls: ['./asset-viewer.component.scss']
})
export class AssetViewerComponent implements OnInit {

  @Input()
  asset: AssetBase;

  constructor() { }

  ngOnInit() {
  }

}
