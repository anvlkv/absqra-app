import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssetBase, AssetContentTypes, AssetTypes, Step } from 'models/api-models';
import { ApiService } from '../../app-common/api-service/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { DesignerRouter } from 'models/api-routes/DesignerRouter';
import { ProjectDetailService } from '../../project/project-detail/project-detail.service';
import { combineLatest, Observable, throwError } from 'rxjs';
import { SequenceDetailService } from '../sequence-detail/sequence-detail.service';
import { StepDetailService } from '../step-detail/step-detail.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';
import { AssetDetailService, AssetPurposes } from './asset-detail.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [AssetDetailService]
})
export class AssetDetailComponent extends BaseDetailForm<AssetBase, AssetDetailService> implements OnInit, OnChanges {
  assetForm: FormGroup;
  assetTypesValues = unpackEnum(AssetTypes);
  assetTypes = AssetTypes;
  contentTypesValues = unpackEnum(AssetContentTypes);
  contentTypes = AssetContentTypes;

  @Input()
  set assetPurposeType (type: AssetPurposes) {
    this.dataItemService.assetPurposeType = type;
  }
  get assetPurposeType(): AssetPurposes {
    return this.dataItemService.assetPurposeType;
  }

  referableSteps: Observable<Step[]>;

  @Input()
  parentId: string;

  constructor(
    assetService: AssetDetailService,
    fb: FormBuilder,
    private api: ApiService,
    private projectService: ProjectDetailService,
    private sequenceService: SequenceDetailService,
    private stepService: StepDetailService
  ) {
    super(assetService, fb);
  }

  ngOnInit() {
    super.ngOnInit();

    if (!this.assetPurposeType) {
      throw new Error(`attribute [assetPurposeType] is required and must be a valid purpose, is [${this.assetPurposeType}]`);
    }

    this.referableSteps = combineLatest(
      this.projectService.dataItemObservable,
      this.stepService.dataItemObservable,
    ).pipe(
      mergeMap(([project, step]) => {
        return this.api.getData(DesignerRouter.viewReferableSteps, {
          projectId: project.id,
          stepId: step.id
        });
      }),
      catchError((err) => {
        this.$state.next({state: ComponentDynamicStates.FAILING, err});
        return throwError(err);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.parentId) {
      this.dataItemService.parentId = this.parentId;
    }
  }
}
