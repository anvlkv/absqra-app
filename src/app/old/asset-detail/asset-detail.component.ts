import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from '../../../models/asset';
import { GeneralDataService } from '../../api/general-data.service';
import { ItemDesignService } from '../../api/item-design.service';
import { ControlContainer, NgForm } from '@angular/forms';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class AssetDetailComponent implements OnInit {
  @Input() asset: Asset;
  @Input() groupName: string;
  @Output() doneEditing: EventEmitter<Asset> = new EventEmitter();
  assetTypes: string[];
  contentTypes: string[];
  contentSources: Item[];
  item: Item;

  constructor(
    private api: GeneralDataService,
    private itemDesign: ItemDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;
    this.assetTypes = this.api.apiTypes['AssetTypes'];
    this.contentTypes = this.api.apiTypes['AssetContentTypes'];
    this.itemDesign.getReferableItems().subscribe(items => this.contentSources = items);
    this.itemDesign.getItem().subscribe(item => this.item);
  }

  addAsset(e) {
    e.preventDefault();
    // console.log(e);
    switch (this.groupName) {
      case 'question': {
        this.itemDesign.setItemQuestion().subscribe(a => {
          this.doneEditing.emit(a);
        });
        break;
      }
      default: {
        this.itemDesign.addAsset().subscribe(a => {
          this.doneEditing.emit(a);
        });
      }
    }

  }

}
