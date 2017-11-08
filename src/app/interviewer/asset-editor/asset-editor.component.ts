import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '../../models/asset';
import { Item } from '../../models/item';
import { InterviewerDataService } from '../interviewer-data.service';
import { GeneralDataService } from '../../general-data.service';

@Component({
  selector: 'app-asset-editor',
  templateUrl: './asset-editor.component.html',
  styleUrls: ['./asset-editor.component.scss']
})
export class AssetEditorComponent implements OnInit {
  @Input() asset: Asset;
  @Input() originItem: Item;

  assetTypes: string[];
  contentTypes: string[];
  dataReady: boolean;
  private availableSources: Item[];

  constructor(
    private dataService: InterviewerDataService,
    private route: ActivatedRoute,
    private gd: GeneralDataService
  ) {

  }

  async ngOnInit() {
    await this.dataService.apiReady();
    this.route.params.subscribe(p => {

      // this.dataService.getSequenceItems(p.sequenceId).subscribe(items => {
      //
      //   this.availableSources = items.filter(itm => itm.id !== this.originItem.id);
      //
      //   console.log(items, this.availableSources);
      //
      // });

      this.assetTypes = this.gd.enumTypes['AssetTypes'];
      this.contentTypes = this.gd.enumTypes['AssetContentTypes'];
      this.dataReady = true;
    });
  }

}
