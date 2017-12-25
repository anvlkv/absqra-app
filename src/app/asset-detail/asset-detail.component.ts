import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from '../../models/asset';
import { GeneralDataService } from '../general-data.service';
import { ItemDesignService } from '../item-design.service';
import { ControlContainer, NgForm } from '@angular/forms';

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

  constructor(
    private api: GeneralDataService,
    private itemDesign: ItemDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;
    this.assetTypes = this.api.apiTypes['AssetTypes'];
    this.contentTypes = this.api.apiTypes['AssetContentTypes'];
  }

  addAsset(e) {
    e.preventDefault();
    // console.log(e);
    this.itemDesign.addAsset().subscribe(a => {
      this.doneEditing.emit(a);
    });
  }

}
