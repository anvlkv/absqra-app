import { Component, ElementRef, OnInit } from '@angular/core';
import { Sequence, SequenceLifeCycleTypes } from '../../../models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api-service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ComponentDynamicStates,
  DynamicState,
  stateCombinator,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss', '../styles/sequence-design.scss']
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
    this.callConfigurator = (sequenceId, cause) => {
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
      this.$stepsState.asObservable(),
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
          this.update(this.dataItem);
        }
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
        this.$headerState.next(ComponentDynamicStates.EDITING);
        this.$stepsState.next(ComponentDynamicStates.EMPTY);
      }
    });

    this.state.pipe(filter((s) => s == ComponentDynamicStates.VIEWING)).subscribe(() => {
        this.$headerState.next(ComponentDynamicStates.VIEWING);
        this.$stepsState.next(ComponentDynamicStates.EDITING);
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

  saveHeader(e: Event) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;

    if (this.sequenceHeaderForm.valid) {
      this.$headerState.next(ComponentDynamicStates.INTERIM);
      if (this.dataItemId) {
        this.dataItem.header = this.sequenceHeaderForm.value;
        this.update();
      }
      else {
        this.save({header: this.sequenceHeaderForm.value});
      }
    }

    return false;
  }

  editHeader() {
    this.$headerState.next(ComponentDynamicStates.EDITING);
  }
}
