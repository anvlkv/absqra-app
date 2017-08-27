import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../item';
import { MockDataService } from '../../mock-data.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
  @Input() itemId: string;
  @Output() itemSaved: EventEmitter<string> = new EventEmitter();

  private item: Item;
  private itemTypes: string[];

  constructor(private dataService: MockDataService) {
    this.itemTypes = [
      'Select multiple',
      'Select single',
      'List'
    ];
  }

  ngOnInit() {
    this.dataService.getItem(this.itemId).subscribe(item => {
      this.item = item;
    });
  }

  saveItem() {
    this.dataService.updateItem(this.item).subscribe(itm => {
      this.itemSaved.emit(itm.id);
    });
  }

  addItemAsset() {
    if (!this.item.assets) {
      this.item.assets = [];
    }
    this.item.assets.push({
      type: 0,
      contentType: 0
    });
  }

}
