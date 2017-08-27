import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../item';
import { MockDataService } from '../../mock-data.service';
import { ItemAsset } from '../../item-asset';

@Component({
  selector: 'app-asset-editor',
  templateUrl: './asset-editor.component.html',
  styleUrls: ['./asset-editor.component.scss']
})
export class AssetEditorComponent implements OnInit {
  @Input() asset: ItemAsset;
  @Input() originItem: Item;

  private assetTypes: string[];
  private contentTypes: string[];
  private availableSources: Item[];

  constructor(private dataService: MockDataService,
              private route: ActivatedRoute) {
    this.assetTypes = [
      'Static',
      'Dynamic'
    ];

    this.contentTypes = [
      'text'
    ];
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.dataService.getSequenceItems(p.sequenceId).subscribe(items => {

        this.availableSources = items.filter(itm => itm.id !== this.originItem.id);

        console.log(items, this.availableSources);

      });

    });
  }

}
