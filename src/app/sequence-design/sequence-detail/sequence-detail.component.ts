import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Project, Sequence, SequenceLifeCycleTypes } from 'models/api-models';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unpackEnum } from '../../utils';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { CRUD } from '../../app-common/api-service/api.service';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import {
  ComponentDynamicStates,
  DynamicState,
  stateCombinator,
} from '../../app-common/dynamic-state/dynamic-state.component';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SequenceService } from './sequence.service';
import { StepDetailComponent } from '../step-detail/step-detail.component';
import { SequenceDetailCRouteReservedParam } from '../../../models/reservedRouteParams';
import { ProjectService } from '../../project/project-detail/project.service';
import { DesignerRouter } from '../../../models/api-routes/DesignerRouter';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [SequenceService]
})
export class SequenceDetailComponent extends BaseDetailForm<Sequence> implements OnInit {
  private $headerState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  private $stepsState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);

  sequenceForm: FormGroup;
  sequenceHeaderForm: FormGroup;
  lifeCycleOptions: string[];
  headerState: Observable<DynamicState>;
  stepsState: Observable<DynamicState>;

  @ViewChildren(StepDetailComponent)
  stepComponents: QueryList<StepDetailComponent>;

  project: Project;

  constructor(
    sequenceService: SequenceService,
    fb: FormBuilder,
    private projectService: ProjectService
  ) {
    super(sequenceService, fb);
    this.lifeCycleOptions = unpackEnum(SequenceLifeCycleTypes);

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

    this.projectService.dataItemObservable.subscribe(p => this.project = p);

    this.state.pipe(filter((s) => s == ComponentDynamicStates.VIEWING)).subscribe(() => {
        this.$headerState.next(ComponentDynamicStates.VIEWING);
        this.$stepsState.next(ComponentDynamicStates.EDITING);
    });
  }

  editHeader() {
    this.$headerState.next(ComponentDynamicStates.EDITING);
  }
}
