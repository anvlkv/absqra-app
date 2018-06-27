import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sequence, SequenceLifeCycleTypes, Step } from '../../../api-models';
import { DataService } from '../../app-common/data.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, combineLatest } from 'rxjs/index';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss']
})
export class SequenceDetailComponent implements OnInit {

  sequence: Sequence;
  state: Observable<DynamicState>;
  @Input() sequenceId: number;
  @Output() sequenceIdChange = new EventEmitter<number>();
  sequenceForm: FormGroup;

  private $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  private lifeCycleOptions: string[];

  private defaultStep: Step;
  constructor(
    private data: DataService,
    private fb: FormBuilder
  ) {
    this.state = this.$state.asObservable();
    this.lifeCycleOptions = unpackEnum(SequenceLifeCycleTypes);
  }

  ngOnInit() {
    this.data.getData<Step>(CRUDRouter.getStep, {stepId: 0}).subscribe(defaultStep => {
      this.defaultStep = defaultStep;
    });

    if (!this.sequence && this.sequenceId) {
      combineLatest(
        this.data.getData<Sequence>(CRUDRouter.getSequence, {sequenceId: this.sequenceId}),
        this.data.getData<Step>(CRUDRouter.getStep, {stepId: 0})
      ).subscribe(([sequence, defaultStep]) => {
        this.sequence = sequence;
        this.sequenceForm = this.fb.group({
          header: this.fb.group({
            name: sequence.header.name,
            description: sequence.header.description,
            lifeCycle: sequence.header.lifeCycle
          }),
          stepIds: this.fb.control(sequence.stepIds || [])
        });
        this.defaultStep = defaultStep;
        this.$state.next(ComponentDynamicStates.VIEWING);
      });
    }
    else if (this.sequence) {
      if (this.sequenceId && this.sequenceId != this.sequence.id) {
        throw new Error('its a mess');
      }
      this.sequenceId = this.sequence.id;
      this.$state.next(ComponentDynamicStates.VIEWING);
      this.data.getData<Step>(CRUDRouter.getStep, {stepId: 0}).subscribe(defaultStep => {
        this.defaultStep = defaultStep;
      });
    }
    else {
      combineLatest(
        this.data.getData<Sequence>(CRUDRouter.getSequence, {sequenceId: 0}),
        this.data.getData<Step>(CRUDRouter.getStep, {stepId: 0})
      ).subscribe(([defaultSequence, defaultStep]) => {
        this.sequenceForm = this.fb.group({
          ...defaultSequence,
          header: this.fb.group({
            ...defaultSequence.header,
            description: ''
          }),
          steps: this.fb.array(defaultSequence.steps || [defaultStep])
        });
        this.defaultStep = defaultStep;
        this.$state.next(ComponentDynamicStates.EDITING);
      });
    }
  }

  editHeader() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  saveHeader() {
    if (this.sequenceForm.valid) {
      if (this.sequenceId) {
        this.data.postData<Sequence>(CRUDRouter.saveSequence, {sequenceId: this.sequenceId}, {header: this.sequenceForm.value.header}).subscribe(updatedSequence => {
          this.sequence = updatedSequence;
          this.$state.next(ComponentDynamicStates.VIEWING);
        });
      }
      else {
        this.data.postData<Sequence>(CRUDRouter.newSequence, {}, {header: this.sequenceForm.value.header}).subscribe(newSequence => {
          this.sequence = newSequence;
          this.sequenceId = newSequence.id;
          this.sequenceIdChange.emit(newSequence.id);
          this.$state.next(ComponentDynamicStates.VIEWING);
        });
      }
    }
  }

}
