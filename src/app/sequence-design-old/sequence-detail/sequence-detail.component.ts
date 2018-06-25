import { Component, OnInit } from '@angular/core';
import { CRUDRouter } from '../../../../../intervey-api/lib/router/CRUDRouter';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { Observable } from 'rxjs/index';
import { Sequence } from '../../../api-models';
import { BaseDetail } from '../../app-common/base-detail';
import { DataService } from '../../app-common/data.service';
import { CRUD } from '../../app-common/api.service';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss'],
})
export class SequenceDetailComponent extends BaseDetail<Sequence> {
  sequenceState: Observable<DynamicState>;
  constructor(
    data: DataService
  ) {
    super(data);
    this.sequenceState = this.$state.asObservable();

    this.callConfigurator = (sequence, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.newSequence
          }
        }
        case CRUD.READ: {
          return {
            route: CRUDRouter.getSequence,
            params: { sequenceId: this.dataItemId }
          }
        }
        case CRUD.UPDATE: {
          return {
            route: CRUDRouter.saveSequence,
            params: { sequenceId: this.dataItemId }
          }
        }
        case CRUD.DELETE: {
          return {
            route: CRUDRouter.deleteSequence,
            params: { sequenceId: this.dataItemId }
          }
        }
      }
    }
  }

  editHeader() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  save(form) {
    // console.log(form);
    if (form.valid) {
      this.saveDataItem();
    }
  }
}
