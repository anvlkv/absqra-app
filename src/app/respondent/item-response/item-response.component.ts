import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MockDataService } from '../../mock-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../models/item';
import { SequenceService } from '../sequence.service';
import { ResponseService } from '../response.service';


interface ItemAsset {
}

@Component({
  selector: 'app-item-response',
  templateUrl: './item-response.component.html',
  styleUrls: ['./item-response.component.scss']
})
export class ItemResponseComponent implements OnInit, OnDestroy {
  @Input() sequenceId: string;

  item: Item;
  itemTypes;
  response: any = null;
  seqResponse: any;
  private subs: Subscription[] = [];
  private ItemAssetTypes: any;
  private ItemAssetContentTypes: any;

  constructor(
    private dataService: MockDataService,
    private route: ActivatedRoute,
    private sequenceService: SequenceService,
    private responseService: ResponseService
  ) {
  }

  ngOnInit() {
    this.subs[0] = this.route.params.subscribe(params => {
      this.dataService.getItem(params.itemId).subscribe(item => {
        this.item = item;
      });
    });

    this.subs[1] = this.sequenceService.sequence$.subscribe((s) => {
      this.sequenceId = s._id;
    });

    this.subs[2] = this.responseService.sequenceResponse$.subscribe((r) => {
      this.seqResponse = r;

      if (this.item.assets && this.item.assets.length > 0) {
        this.prepareAssets();
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  prepareAssets() {

    this.item.assets = this.item.assets.reduce( (output, asset) => {
      if ( asset.type == this.ItemAssetTypes.dynamicAsset) {
          const source = this.seqResponse.items.find(itm => itm.itemId === asset.source);
          if (source) {
            output = output.concat(source.response.map(i => {
              return <ItemAsset> {
                contentType: this.ItemAssetContentTypes.textContent,
                type: this.ItemAssetTypes.staticAsset,
                content: i.content
              };
            }));
          }
      }
      else {
        output.push(asset);
      }
      return output;
    }, []);
  }

  submitResponse($event: Event, resp) {
    $event.preventDefault();

    const submission: any = {
      itemId: this.item._id,
      response: resp
    };

    this.dataService.postItemResponse(
      submission,
      this.sequenceId,
      this.seqResponse ? this.seqResponse.id : null
    ).subscribe(completeResponse => {
      this.responseService.setResponse(completeResponse);
    });

    this.sequenceService.nextItem(this.item._id).then(() => {
      this.response = null;
    });
  }

}
