import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../item';
import { MockDataService } from '../../mock-data.service';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss']
})
export class ItemThumbnailComponent implements OnInit {
  @Input() itemId: string;
  item: Item;

  constructor(private dataService: MockDataService) {
  }

  ngOnInit() {
    this.dataService.getItem(this.itemId).subscribe(itm => {
      this.item = itm;
    });
  }

}
