import { Component, OnInit } from '@angular/core';
import { Sequence, SequenceLifeCycleTypes } from '../../../api-models';
import { DataService } from '../../app-common/data.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api.service';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss']
})
export class SequenceDetailComponent extends BaseDetail<Sequence> implements OnInit {
  sequenceForm: FormGroup;
  sequenceHeaderForm: FormGroup;
  lifeCycleOptions: string[];

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
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const sequence = loaded ? this.dataItem : this.defaultItem;
      this.sequenceHeaderForm = this.fb.group({...sequence.header, description: sequence.header.description});

      this.sequenceForm = this.fb.group({
        stepIds: this.fb.control(sequence.stepIds)
      });

      if (!loaded) {
        this.edit();
      }
    });
  }

  saveHeader() {
    if (this.sequenceHeaderForm.valid) {
      this.dataItem.header = this.sequenceHeaderForm.value;
      if (this.id) {
        this.update();
      }
      else {
        this.save();
      }
    }
  }
}
