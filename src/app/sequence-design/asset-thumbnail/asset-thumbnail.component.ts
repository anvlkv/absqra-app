import { Component, OnInit } from '@angular/core';
import { AssetContentTypes, AssetTypes, AssetBase } from 'models/api-models';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';
import { SequenceService } from '../sequence-detail/sequence.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-asset-thumbnail',
  templateUrl: './asset-thumbnail.component.html',
  styleUrls: ['./asset-thumbnail.component.scss']
})
export class AssetThumbnailComponent extends BaseThumbnail<AssetBase> implements OnInit {
  assetTypes = AssetTypes;
  contentTypes = AssetContentTypes;
  sequenceId: string;

  routerLink: string | Object [];

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    // this.sequence.activeSequence.asObservable().pipe(map(s => s.id)).subscribe(id => this.sequenceId = id);
    this.state.subscribe(s => {
      this.route.params.subscribe(({sequenceId, stepId}) => {
        this.routerLink = stepId ? ['../', this.dataItem.sourceStepId] : [this.dataItem.sourceStepId];
      });
    });
  }
}
