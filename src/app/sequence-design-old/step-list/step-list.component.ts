import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { DataService } from '../../app-common/data.service';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/index';
import { Step } from '../../../api-models/step';
import { Sequence } from '../../../api-models/sequence';
import { BaseList } from '../../app-common/base-list';
import { CRUD } from '../../app-common/api.service';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss'],
})
export class StepListComponent extends BaseList<Step, Sequence> {

  listState: Observable<DynamicState>;

  constructor(
    data: DataService
  ) {
    super(data);
    this.listState = this.$state.asObservable();
    this.callConfigurator = (steps, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoSteps,
          };
        }
        case CRUD.READ: {
          return {
            route: CRUDRouter.repoStepsOfSequence,
            params: {sequenceId: this.sourceItemId},
          };
        }
      }
    };

    this.parentCallConfigurator = (steps, cause) => {
      switch (cause) {
        case CRUD.READ: {
          return {
            route: CRUDRouter.entitySequence,
            params: {sequenceId: this.sourceItemId}
          };
        }
        case CRUD.UPDATE: {
          return {
            route: CRUDRouter.entitySequence,
            params: {sequenceId: this.sourceItemId}
          };
        }
      }
    };

    this.archetypeRetriever = () => data.getData<Step>(CRUDRouter.entityStep, {stepId: null});

    this.sourceItemRelationName = 'steps';
  }
}
