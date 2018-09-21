import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { AssetContentTypes, AssetTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { AssetBase } from 'models/api-models';
import { ApiRoute } from 'api';

export enum AssetPurposes {
  QUESTION,
  QUESTION_OPTION,
  RESPONSE_OPTION,
}

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss', '../styles/sequence-design.scss']
})
export class AssetDetailComponent extends BaseDetail<AssetBase> implements OnInit {
  assetForm: FormGroup;
  assetTypesValues = unpackEnum(AssetTypes);
  assetTypes = AssetTypes;
  contentTypesValues = unpackEnum(AssetContentTypes);
  contentTypes = AssetContentTypes;

  @Input()
  assetPurposeType: AssetPurposes;

  constructor(
    data: DataService,
    private fb: FormBuilder
  ) {
    super(data);
    this.callConfigurator = (assetId, cause) => {
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

  ngOnInit() {
    super.ngOnInit();

    if (!AssetPurposes[this.assetPurposeType]) {
      throw new Error(`attribute [assetPurposeType] is required and must be a valid purpose, is [${this.assetPurposeType}]`);
    }

    this.itemSetObservable.subscribe((loaded) => {
      const asset = loaded ? this.dataItem : this.defaultItem;
      this.assetForm = this.fb.group({...asset, content: this.fb.control(asset.content || null, Validators.required)});
      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
      }
    });
  }

  saveAssetHeader(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;
    if (this.assetForm.valid) {
      if (this.dataItemId) {
        this.update({...this.dataItem, ...this.assetForm.value})
      }
      else {
        this.save(this.assetForm.value);
      }
    }
    return false;
  }
}
