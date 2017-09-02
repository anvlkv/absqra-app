import { Component, Input, OnInit } from '@angular/core';
import { MockDataService } from '../../mock-data.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../item';
import { ItemTypes } from '../../item-types';
import { SequenceService } from '../sequence.service';
import { SequenceResponse } from '../../response';
import { ItemResponse } from '../../item-response';
import { ItemAssetTypes } from '../../item-asset-types';
import { ResponseService } from '../response.service';
import { ItemAsset } from '../../item-asset';
import { ItemAssetContentTypes } from '../../item-asset-content-types';

@Component({
  selector: 'app-item-response',
  templateUrl: './item-response.component.html',
  styleUrls: ['./item-response.component.scss']
})
export class ItemResponseComponent implements OnInit {
  @Input() sequenceId: string;

  item: Item;
  itemTypes = ItemTypes;
  response: any = null;
  seqResponse: SequenceResponse;

  constructor(
    private dataService: MockDataService,
    private route: ActivatedRoute,
    private sequenceService: SequenceService,
    private responseService: ResponseService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getItem(params.itemId).subscribe(item => {
        this.item = item;
      });
    });

    this.sequenceService.sequence$.subscribe((s) => {
      this.sequenceId = s.id;
    });

    this.responseService.sequenceResponse$.subscribe((r) => {
      this.seqResponse = r;

      if (this.item.assets && this.item.assets.length > 0) {
        this.prepareAssets();
      }
    });
  }

  prepareAssets() {

    this.item.assets = this.item.assets.reduce( (output, asset) => {
      if ( asset.type == ItemAssetTypes.dynamicAsset) {
          const source = this.seqResponse.items.find(itm => itm.itemId === asset.source);
          output = output.concat(source.response.map(i => {
            return <ItemAsset> {
              contentType: ItemAssetContentTypes.textContent,
              type: ItemAssetTypes.staticAsset,
              content: i.content
            };
          }));
      }
      else {
        output.push(asset);
      }
      return output;
    }, []);
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
      this.responseService.setResponse(completeResponse);
    });

    this.sequenceService.nextItem(this.item.id).then(() => {
      this.response = null;
    });
  }

}
