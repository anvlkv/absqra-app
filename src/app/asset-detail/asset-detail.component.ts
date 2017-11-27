import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  @Input() asset: Asset;
  @Output() doneEditing: EventEmitter<Asset> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  addAsset() {

  }

}
