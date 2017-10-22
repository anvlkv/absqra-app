import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterviewerDataService } from '../interviewer-data.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
  @Input() itemId: string;
  @Output() itemSaved: EventEmitter<string> = new EventEmitter();

  item: Item;
  itemTypes: string[];

  private prestineItem: Item;

  constructor(
    private dataService: InterviewerDataService
  ) {
    this.itemTypes = [
      'Select multiple',
      'Select single',
      'List'
    ];
  }

  async ngOnInit() {
    await this.dataService.apiReady();

    this.dataService.getItem(this.itemId).subscribe(item => {
      this.item = item;
      this.prestineItem = JSON.parse(JSON.stringify(item));
    });
  }

  saveItem() {
    this.dataService.updateItem(this.prestineItem, this.item).subscribe(itm => {
      this.itemSaved.emit(itm._id);
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
