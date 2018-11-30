import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { SequenceResponse } from 'models/api-models';
import { ApiService } from '../../app-common/api-service/api.service';
import { DataOpRouter } from 'models/api-routes/DataOpRouter';
import { ActivatedRoute } from '@angular/router';
import { ResponseDetailService } from './response-detail.service';

@Component({
  selector: 'app-response-detail',
  templateUrl: './response-detail.component.html',
  styleUrls: ['./response-detail.component.scss'],
  providers: [ResponseDetailService]
})
export class ResponseDetailComponent extends BaseDetail<SequenceResponse, ResponseDetailService> implements OnInit {
  constructor(
    responseService: ResponseDetailService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    super(responseService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(({sequenceResponseId}) => {
      this.dataItemId = sequenceResponseId;
      this.dataItemService.fetch(this.dataItemId);
    });
  }

  download() {
    this.api.download(DataOpRouter.entitySequenceResponse, {operationType: 'download', sequenceResponseId: this.dataItemId});
  }
}
