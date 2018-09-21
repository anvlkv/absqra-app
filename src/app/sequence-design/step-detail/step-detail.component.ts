import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Step, StepTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { CRUD } from '../../app-common/api-service/api.service';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { Observable } from 'rxjs';
import { unpackEnum } from '../../utils';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss', '../styles/sequence-design.scss'],
})
export class StepDetailComponent extends BaseDetail<Step> implements OnInit {
  stepTypeState: Observable<DynamicState>;
  stepTypesList: string[];
  typeForm: FormGroup;
  stepTypes = StepTypes;
  private stepcontentAssetState: Observable<DynamicState>;

  constructor(
    data: DataService,
    private fb: FormBuilder
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
    });
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
