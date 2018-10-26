import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { SequenceResponse } from '../../../models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { DataOpRouter } from '../../../models/api-routes/DataOpRouter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-detail',
  templateUrl: './response-detail.component.html',
  styleUrls: ['./response-detail.component.scss']
})
export class ResponseDetailComponent extends BaseDetail<SequenceResponse> implements OnInit {
  constructor(
    data: DataService,
    private route: ActivatedRoute
  ) {
    super(data);
    this.callConfigurator = (sequenceResponseId, cause) => {
      switch (cause) {
        default: {
          return {
            route: CRUDRouter.entitySequenceResponse,
            params: {sequenceResponseId}
          }
        }
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(({sequenceResponseId}) => {
      this.dataItemId = sequenceResponseId;
      this.fetch();
    });
  }

  download() {
    this.data.download(DataOpRouter.entitySequenceResponse, {operationType: 'download', sequenceResponseId: this.dataItemId});
  }
}
