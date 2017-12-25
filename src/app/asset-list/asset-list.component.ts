import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class AssetListComponent implements OnInit {
  @Input() assets: Asset[];
  editing: {[id: number]: boolean} = {};

  constructor() { }

  ngOnInit() {
  }

  addedAsset(a: Asset) {
    this.editing[a.id] = true;
  }
}
