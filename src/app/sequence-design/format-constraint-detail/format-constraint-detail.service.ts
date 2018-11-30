import { Injectable } from '@angular/core';
import { FormatConstraint } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CallConfig } from 'models/call-config';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';


export enum FormatConstraintPurposes {
  QUESTION = 'question',
  LOGIC = 'logic'
}

@Injectable({
  providedIn: 'root',
})
export class FormatConstraintDetailService extends BaseDetailService<FormatConstraint> {
  public formatConstraintPurposeType: FormatConstraintPurposes;

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(formatConstraintId: string, cause: CRUD, item?: FormatConstraint): CallConfig {
    switch (cause) {
      case CRUD.CREATE: {
        if (this.formatConstraintPurposeType === FormatConstraintPurposes.QUESTION) {
          return {
            route: CRUDRouter.repoFormatConstraintsOfQuestion,
            params: {questionId: this.parentId}
          }
        }
        else if (this.formatConstraintPurposeType === FormatConstraintPurposes.LOGIC) {
          return {
            route: CRUDRouter.repoFormatConstraintsOfLogic,
            params: {logicId: this.parentId}
          }
        }
        break;
      }
      default: {
        return {
          route: CRUDRouter.entityFormatConstraint,
          params: {formatConstraintId}
        }
      }
    }
  }
}
