import { Component, OnInit } from '@angular/core';
import { Sequence, SequenceLifeCycleTypes } from '../../../api-models';
import { DataService } from '../../app-common/data.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  ComponentDynamicStates,
  DynamicState,
  ImmediateStateConfiguration, stateCombinator,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { map } from 'rxjs/operators';
import { instance } from 'ts-mockito';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss']
})
export class SequenceDetailComponent extends BaseDetail<Sequence> implements OnInit {
  private $headerState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  private $stepsState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);

  sequenceForm: FormGroup;
  sequenceHeaderForm: FormGroup;
  lifeCycleOptions: string[];
  headerState: Observable<DynamicState>;
  stepsState: Observable<DynamicState>;

  constructor(
    data: DataService,
    private fb: FormBuilder
  ) {
    super(data);
    this.lifeCycleOptions = unpackEnum(SequenceLifeCycleTypes);
    this.callConfigurator = (sequenceId, cause, sequence) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoSequences
          }
        }
        default: {
          return {
            route: CRUDRouter.entitySequence,
            params: {sequenceId}
          }
        }
      }
    };

    this.headerState = stateCombinator(
      this.state,
      this.$headerState.asObservable()
    );

    this.stepsState = stateCombinator(
      this.state,
      this.$stepsState.asObservable()
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const sequence = loaded ? this.dataItem : this.defaultItem;

      if (!this.sequenceHeaderForm) {
        this.sequenceHeaderForm = this.fb.group({...sequence.header, description: sequence.header.description});
      }

      if (!this.sequenceForm) {
        this.sequenceForm = this.fb.group({
          stepIds: this.fb.control(sequence.stepIds)
        });
      }

      this.sequenceForm.valueChanges.subscribe(({stepIds}) => {
        if (stepIds.every(id => !!id)) {
          this.dataItem.steps = stepIds.map((id, i) => ({id, order: i}));
          this.update();
        }
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
        this.$headerState.next(ComponentDynamicStates.EDITING);
      }
      else {
        this.$headerState.next(ComponentDynamicStates.VIEWING);
        this.$stepsState.next(ComponentDynamicStates.EDITING);
      }

    });
  }

  saveSteps() {
    if (this.sequenceForm.valid) {
      const stepIds = this.sequenceForm.controls.stepIds.value;
      if (stepIds.every(id => !!id)) {
        this.dataItem.steps = stepIds.map((id, i) => ({id, order: i}));
        this.update();
      }
    }
  }

  saveHeader() {
    if (this.sequenceHeaderForm.valid) {
      if (this.id) {
        this.dataItem.header = this.sequenceHeaderForm.value;
        this.update();
      }
      else {
        this.save({header: this.sequenceHeaderForm.value});
      }
    }
  }

  editHeader() {
    this.$headerState.next(ComponentDynamicStates.EDITING);
  }
}
