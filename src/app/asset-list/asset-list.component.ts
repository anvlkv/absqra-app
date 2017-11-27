import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  @Input() assets: Asset[];
  editing: {[id: number]: boolean} = {};

  constructor() { }

  ngOnInit() {
  }

  onDoneEditing() {

  }
}
