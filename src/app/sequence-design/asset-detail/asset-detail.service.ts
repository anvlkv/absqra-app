import { Injectable } from '@angular/core';
import { AssetBase } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CallConfig } from 'models/call-config';
import { BaseDetailService } from '../../app-common/base-detail/base-detail-service';
import { ApiService, CRUD } from '../../app-common/api-service/api.service';

export enum AssetPurposes {
  QUESTION = 'question',
  QUESTION_OPTION = 'question_options',
  RESPONSE_OPTION = 'response_option',
  STEP_CONTENT = 'step_content'
}

@Injectable({
  providedIn: 'root',
})
export class AssetDetailService extends BaseDetailService<AssetBase> {
  public parentId: string;
  public assetPurposeType: AssetPurposes;

  constructor(public api: ApiService) {
    super(api);
  }

  callConfigurator(assetId: string, cause: CRUD, item?: AssetBase): CallConfig {
    let repo;
    let entity;

    switch (this.assetPurposeType) {
      case AssetPurposes.QUESTION:
        repo = {
          route: CRUDRouter.repoQuestionContentAssets,
          params: {}
        };
        entity = {
          route: CRUDRouter.entityQuestionContentAsset,
          params: {questionContentAssetId: assetId}
        };
        break;
      case AssetPurposes.QUESTION_OPTION:
        repo = {
          route: CRUDRouter.repoQuestionAssetsOfQuestion,
          params: {questionId: this.parentId}
        };
        entity = {
          route: CRUDRouter.entityQuestionAsset,
          params: {questionAssetId: assetId}
        };
        break;
      case AssetPurposes.RESPONSE_OPTION:
        repo = {
          route: CRUDRouter.repoResponseAssetsOfQuestion,
          params: {questionId: this.parentId}
        };
        entity = {
          route: CRUDRouter.entityResponseAsset,
          params: {responseAssetId: assetId}
        };
        break;
      case AssetPurposes.STEP_CONTENT:
        repo = {
          route: CRUDRouter.repoStepAssets,
          params: {}
        };
        entity = {
          route: CRUDRouter.entityStepAsset,
          params: {stepAssetId: assetId}
        };
        break;
      default:
        throw new Error(`unknown asset purpose for asset [id: ${assetId}] : [${this.assetPurposeType}]`);
    }

    switch (cause) {
      case CRUD.CREATE: {
        return repo;
      }
      default: {
        return entity;
      }
    }
  }
}
