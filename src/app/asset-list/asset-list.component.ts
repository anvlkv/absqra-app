import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { ControlContainer, NgForm } from '@angular/forms';
import { ItemDesignService } from '../item-design.service';
import { SortableService } from '../sortable.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class AssetListComponent implements OnInit {
  @Input() assets: Asset[];
  editing: {[id: number]: boolean} = {};

  constructor(
    private itemDesign: ItemDesignService,
    private sort: SortableService
  ) { }

  ngOnInit() {
  }

  addedAsset(a: Asset) {
    this.editing[a.id] = true;
  }

  onOrderChanged(a: Asset, [oldOrder, newOrder]) {
    this.itemDesign.updateItemAssetsOrder(this.sort.reorderSortables(this.assets, a, oldOrder, newOrder), [a, this.assets[newOrder - 1]]);
  }
}
