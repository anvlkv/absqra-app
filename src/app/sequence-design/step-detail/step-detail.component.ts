import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Step, StepTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CRUD } from '../../app-common/api-service/api.service';
import {
  ComponentDynamicStates,
  DynamicState,
  DynamicStateComponent,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { unpackEnum } from '../../utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepService } from './step.service';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetPurposes } from '../asset-detail/asset-detail.component';
import { SequenceService } from '../sequence-detail/sequence.service';


@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss'],
  providers: [StepService]
})
export class StepDetailComponent extends BaseDetail<Step> implements OnInit {
  stepTypeState: Observable<DynamicState>;
  stepTypesList: string[];
  typeForm: FormGroup;
  stepTypes = StepTypes;
  assetPurposeTypes = AssetPurposes;

  @ViewChildren(DynamicStateComponent)
  dynamicStateComponents: QueryList<DynamicStateComponent>

  constructor(
    data: DataService,
    private fb: FormBuilder,
    private stepService: StepService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private sequence: SequenceService
  ) {
    super(data);
    this.stepTypesList = unpackEnum(StepTypes);
    this.callConfigurator = (stepId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoStepsOfSequence,
            params: {sequenceId: this.parentId}
          };
        }
        default: {
          return {
            route: CRUDRouter.entityStep,
            params: {stepId},
          };
        }
      }
    };
  }

  public scrollIntoView() {
    this.state.pipe(
      filter(s => s === ComponentDynamicStates.VIEWING || s === ComponentDynamicStates.EDITING),
      mergeMap(s => {
        return !this.dynamicStateComponents.length ? this.dynamicStateComponents.changes : of(s);
      })
    ).subscribe((s) => {
      if (s === ComponentDynamicStates.VIEWING || s === ComponentDynamicStates.EDITING) {
        this.el.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
      }
      else {
        setTimeout(() => {
          this.el.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        }, 1000)
      }
    });
  }

  referredEntityId() {
    switch (this.dataItem.type) {
      case StepTypes.QUESTION_REF:
        return this.dataItem.questionReferenceId;
      case StepTypes.TASK_REF:
        return this.dataItem.taskReferenceId;
      case StepTypes.LOGICAL_ITEM:
        return this.dataItem.logicReferenceId;
      case StepTypes.SEQUENCE_REF:
        return this.dataItem.sequenceReferenceId;
      default:
        break;
    }
    return;
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const step = loaded ? this.dataItem : this.defaultItem;

      this.typeForm = this.fb.group({type: step.type});

      this.typeForm.valueChanges.subscribe(v => {
        if (this.dataItemId) {
          this.dataItem.type = v.type;
          this.update();
        }
        else {
          this.dataItem = v;
          this.save();
        }
      });

      if (!loaded) {
        this.editType();
      }

      this.stepService.activeStep.next(step);
    });

    this.state.pipe(
      filter((state)  => state === ComponentDynamicStates.EDITING),
    ).subscribe(()  => {
      if (this.dataItemId) {
        const prefix = this.route.snapshot.params['stepId'] ? '../' : null;
        this.router.navigate([prefix, this.dataItemId].filter(c => !!c), {relativeTo: this.route})
      }
    })
  }

  editType() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  trackType(i) {
    return i;
  }


  updateReference(refId: number, referencedProperty: string) {
    this.dataItem[referencedProperty] = {id: refId};
    this.update();
  }
}
