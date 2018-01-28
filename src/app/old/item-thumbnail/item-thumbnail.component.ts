import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { GeneralDataService } from '../../api/general-data.service';
import { ItemDesignService } from '../../api/item-design.service';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss'],
  providers: [
    ItemDesignService
  ]
})
export class ItemThumbnailComponent implements OnInit {
  @Input() itemId: number;

  item: Item;

  constructor(
    private api: GeneralDataService,
    private itemDesign: ItemDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;
    this.itemDesign.set$item(this.itemId).subscribe(i => this.item = i);
  }

}
