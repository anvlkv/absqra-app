import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Step, StepTypes } from 'models/api-models';
import {
  ComponentDynamicStates,
  DynamicState,
  DynamicStateComponent,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { Observable, of } from 'rxjs';
import { unpackEnum } from '../../utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepDetailService } from './step-detail.service';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SequenceDetailService } from '../sequence-detail/sequence-detail.service';
import { AssetPurposes } from '../asset-detail/asset-detail.service';
import { BaseDetailFormControl } from '../../app-common/base-detail/base-detail-form-control';


@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss'],
  providers: [StepDetailService]
})
export class StepDetailComponent extends BaseDetailFormControl<Step, StepDetailService> implements OnInit, OnChanges {
  stepTypeState: Observable<DynamicState>;
  stepTypesList: string[];
  typeForm: FormGroup;
  stepTypes = StepTypes;
  assetPurposeTypes = AssetPurposes;

  @ViewChildren(DynamicStateComponent)
  dynamicStateComponents: QueryList<DynamicStateComponent>;

  @Input()
  sequenceId: string;

  constructor(
    stepService: StepDetailService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private sequence: SequenceDetailService
  ) {
    super(stepService, fb);
    this.stepTypesList = unpackEnum(StepTypes);
  }

  ngOnInit() {
    super.ngOnInit();

    this.state.pipe(
      filter((state)  => state === ComponentDynamicStates.EDITING),
    ).subscribe(()  => {
      if (this.dataItemId) {
        const prefix = this.route.snapshot.params['stepId'] ? '../' : null;
        this.router.navigate(
          [prefix, this.dataItemId].filter(c => !!c), {relativeTo: this.route}
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sequenceId) {
      this.dataItemService.sequenceId = this.sequenceId;
    }
  }

  public scrollIntoView() {
    this.state.pipe(
      filter(s => s === ComponentDynamicStates.VIEWING || s === ComponentDynamicStates.EDITING),
      mergeMap(s => {
        return !this.dynamicStateComponents.length ? this.dynamicStateComponents.changes : of(s);
      })
    ).subscribe((s) => {
      if (s === ComponentDynamicStates.VIEWING || s === ComponentDynamicStates.EDITING) {
        this.el.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
      else {
        setTimeout(() => {
          this.el.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        }, 1000);
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


  editType() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  trackType(i) {
    return i;
  }


  updateReference(refId: number, referencedProperty: string) {
    this.dataItem[referencedProperty] = {id: refId};
  }
}
