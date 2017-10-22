import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../mock-data.service';
import { Asset } from '../../models/asset';
import { Item } from '../../models/item';

@Component({
  selector: 'app-asset-editor',
  templateUrl: './asset-editor.component.html',
  styleUrls: ['./asset-editor.component.scss']
})
export class AssetEditorComponent implements OnInit {
  @Input() asset: Asset;
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

        this.availableSources = items.filter(itm => itm._id !== this.originItem._id);

        console.log(items, this.availableSources);

      });

    });
  }

}
