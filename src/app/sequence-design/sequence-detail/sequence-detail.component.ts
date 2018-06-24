import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sequence, SequenceLifeCycleTypes } from '../../../api-models';
import { DataService } from '../../app-common/data.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/index';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss']
})
export class SequenceDetailComponent implements OnInit {

  sequence: Sequence;
  state: Observable<ComponentDynamicStates>;
  @Input() sequenceId: number;
  @Output() sequenceIdChange = new EventEmitter<number>();
  sequenceForm: FormGroup;

  private $state = new BehaviorSubject<ComponentDynamicStates>(ComponentDynamicStates.LOADING);
  private lifeCycleOptions: string[];

  constructor(
    private data: DataService,
    private fb: FormBuilder
  ) {
    this.state = this.$state.asObservable();
    this.lifeCycleOptions = unpackEnum(SequenceLifeCycleTypes);
  }

  ngOnInit() {
    if (!this.sequence && this.sequenceId) {
      this.data.getData<Sequence>(CRUDRouter.getSequence, {sequenceId: this.sequenceId}).subscribe(sequence => {
        this.sequence = sequence;
        this.sequenceForm = this.fb.group({
          ...sequence,
          header: this.fb.group(sequence.header),
          steps: this.fb.array(sequence.steps || [])
        });
        this.$state.next(ComponentDynamicStates.VIEWING);
      });
    }
    else if (this.sequence) {
      if (this.sequenceId && this.sequenceId != this.sequence.id) {
        throw new Error('its a mess');
      }
      this.sequenceId = this.sequence.id;
      this.$state.next(ComponentDynamicStates.VIEWING);
    }
    else {
      this.data.getData<Sequence>(CRUDRouter.getSequence, {sequenceId: 0}).subscribe(defaultSequence => {
        this.sequenceForm = this.fb.group({
          ...defaultSequence,
          header: this.fb.group(defaultSequence.header),
          steps: this.fb.array(defaultSequence.steps || [])
        });
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
