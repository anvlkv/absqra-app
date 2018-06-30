import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { unpackEnum } from '../../utils';
import { CRUDRouter } from '../../../../../intervey-api/lib/router/CRUDRouter';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { DataService } from '../../app-common/data.service';
import { BaseDetailOld } from '../../app-common/base-detail/base-detail-old';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Step } from '../../../api-models/step';
import { StepTypes } from '../../../api-models/enums/step.enums';
import { CRUD } from '../../app-common/api.service';

@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss']
})
export class StepDetailComponent extends BaseDetailOld<Step> implements OnInit {
  stepTypes = StepTypes;
  typeControlName: string;
  stepTypesList: string[];

  referenceState: Observable<DynamicState>;
  stepState: Observable<DynamicState>;


  private $refState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.VIEWING);

  constructor(
    data: DataService
  ) {
    super(data);
    this.itemBaseValidator = (step: Step) => !!step.type;
    this.stepTypesList = unpackEnum(this.stepTypes);
    this.stepState = this.$state.asObservable();
    this.referenceState = this.$refState.asObservable();
    this.stepState.subscribe(s => {
      this.$refState.next(s);
    });

    this.callConfigurator = (step, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoSteps,
          };
        }
        case CRUD.READ: {
          return {
            route: CRUDRouter.entityStep,
            params: {stepId: this.dataItemId},
          };
        }
        case CRUD.UPDATE: {
          return {
            route: CRUDRouter.entityStep,
            params: {stepId: this.dataItemId},
          };
        }
        case CRUD.DELETE: {
          return {
            route: CRUDRouter.entityStep,
            params: {stepId: this.dataItemId},
          };
        }
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.typeControlName = `stepTypeInput_${this.dataItem.hasOwnProperty('id') ? this.dataItem.id : this.dataItem.order}`;
  }

  trackType(index: number, type: string) {
    return index;
  }

  save(form) {
    if (form.valid) {
      this.saveDataItem();
    }
  }

  addAndEditNewSequence() {
  }

  editStep() {
    this.$state.next(ComponentDynamicStates.EDITING);
    this.$refState.next(ComponentDynamicStates.EDITING);
  }

  stepContentChanged(e, item) {
    console.log(e, item);
    this.saveDataItem();
  }
}
