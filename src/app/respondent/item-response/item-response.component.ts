import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../mock-data.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../item';
import { ItemTypes } from '../../item-types';
import { SequenceService } from '../sequence.service';
import { SequenceResponse } from '../../response';
import { ItemResponse } from '../../item-response';

@Component({
  selector: 'app-item-response',
  templateUrl: './item-response.component.html',
  styleUrls: ['./item-response.component.scss']
})
export class ItemResponseComponent implements OnInit {
  item: Item;
  sequenceId: string;
  itemTypes = ItemTypes;
  response: any = null;
  seqResponse: SequenceResponse;

  constructor(
    private dataService: MockDataService,
    private route: ActivatedRoute,
    private sequenceService: SequenceService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sequenceId = params.sequenceId;
      this.dataService.getItem(params.itemId).subscribe(item => {
        this.item = item;
      });
    });
  }

  submitResponse($event: Event, resp) {
    $event.preventDefault();

    const submission: ItemResponse = {
      itemId: this.item.id,
      response: resp
    };

    this.dataService.postItemResponse(
      submission,
      this.sequenceId,
      this.seqResponse ? this.seqResponse.id : null
    ).subscribe(completeResponse => {
      this.seqResponse = completeResponse;
    });

    this.sequenceService.nextItem(this.item.id).then(() => {
      this.response = null;
    });
  }

}
