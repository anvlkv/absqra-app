import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { unpackEnum } from '../../utils';
import { CRUDRouter } from '../../../../../intervey-api/lib/router/CRUDRouter';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { DataService } from '../../app-common/data.service';
import { BaseDetail } from '../../app-common/base-detail';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Step } from '../../../api-models/step';
import { StepTypes } from '../../../api-models/enums/step.enums';
import { CRUD } from '../../app-common/api.service';

@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss']
})
export class StepDetailComponent extends BaseDetail<Step> implements OnInit {
  stepTypes = StepTypes;
  typeControlName: string;
  stepTypesList: string[];

  referenceState: Observable<ComponentDynamicStates>;
  stepState: Observable<ComponentDynamicStates>;


  private $refState = new BehaviorSubject<ComponentDynamicStates>(ComponentDynamicStates.VIEWING);

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
            route: CRUDRouter.newStep,
          };
        }
        case CRUD.READ: {
          return {
            route: CRUDRouter.getStep,
            params: {stepId: this.dataItemId},
          };
        }
        case CRUD.UPDATE: {
          return {
            route: CRUDRouter.saveStep,
            params: {stepId: this.dataItemId},
          };
        }
        case CRUD.DELETE: {
          return {
            route: CRUDRouter.deleteStep,
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
