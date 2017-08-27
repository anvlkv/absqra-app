import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../mock-data.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../item';
import { ItemTypes } from '../../item-types';
import { SequenceService } from '../sequence.service';

@Component({
  selector: 'app-item-response',
  templateUrl: './item-response.component.html',
  styleUrls: ['./item-response.component.scss']
})
export class ItemResponseComponent implements OnInit {
  item: Item;
  itemTypes = ItemTypes;
  response: any = null;

  constructor(
    private dataService: MockDataService,
    private route: ActivatedRoute,
    private sequenceService: SequenceService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getItem(params.itemId).subscribe(item => {
        this.item = item;
      });
    });
  }

  submitResponse(resp) {
    console.log(resp);
    this.sequenceService.nextItem(this.item.id).then(() => {
      this.response = null;
    });
  }

}
