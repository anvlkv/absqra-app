import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Project, Sequence, SequenceLifeCycleTypes } from 'models/api-models';
import { FormBuilder } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { SequenceDetailService } from './sequence-detail.service';
import { StepDetailComponent } from '../step-detail/step-detail.component';
import { ProjectDetailService } from '../../project/project-detail/project-detail.service';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [SequenceDetailService]
})
export class SequenceDetailComponent extends BaseDetailForm<Sequence, SequenceDetailService> implements OnInit {

  lifeCycleOptions: string[];

  @ViewChildren(StepDetailComponent)
  stepComponents: QueryList<StepDetailComponent>;

  project: Project = null;

  constructor(
    sequenceService: SequenceDetailService,
    fb: FormBuilder,
    protected projectService: ProjectDetailService
  ) {
    super(sequenceService, fb);
    this.lifeCycleOptions = unpackEnum(SequenceLifeCycleTypes);
  }



  ngOnInit() {
    super.ngOnInit();

    this.projectService.dataItemObservable.subscribe(p => this.project = p);
  }
}
