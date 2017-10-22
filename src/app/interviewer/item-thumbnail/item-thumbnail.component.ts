import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { InterviewerDataService } from '../interviewer-data.service';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss']
})
export class ItemThumbnailComponent implements OnInit {
  @Input() itemId: string;
  item: Item;

  constructor(private dataService: InterviewerDataService) {
  }

  ngOnInit() {
    this.dataService.getItem(this.itemId).subscribe(itm => {
      this.item = itm;
    });
  }

}
