import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Project, Sequence, SequenceLifeCycleTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
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
import { ProjectService } from '../../project/project.service';
import { DesignerRouter } from '../../../models/api-routes/DesignerRouter';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [SequenceService]
})
export class SequenceDetailComponent extends BaseDetail<Sequence> implements OnInit, AfterViewInit {
  private $headerState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  private $stepsState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);

  sequenceForm: FormGroup;
  sequenceHeaderForm: FormGroup;
  lifeCycleOptions: string[];
  headerState: Observable<DynamicState>;
  stepsState: Observable<DynamicState>;

  @ViewChildren(StepDetailComponent)
  stepComponents: QueryList<StepDetailComponent>;
  private shouldSaveAsTopSequence: boolean;
  private project: Project;

  constructor(
    data: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sequenceService: SequenceService,
    private router: Router,
    private projectService: ProjectService
  ) {
    super(data);
    this.lifeCycleOptions = unpackEnum(SequenceLifeCycleTypes);
    this.callConfigurator = (sequenceId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          if (this.shouldSaveAsTopSequence) {
            return {
              route: DesignerRouter.saveTopSequenceOfProject,
              params: { projectId: this.project.id }
            }
          }
          else {
            return {
              route: CRUDRouter.repoSequences
            }
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

  ngAfterViewInit() {
    combineLatest(
      this.stepComponents.changes,
      this.route.params
    ).subscribe(([changes, {stepId}]) => {
      const foundStep = this.stepComponents.find(stepC  => {
        return stepC.dataItemId === stepId
      });
      if (foundStep) {
        foundStep.scrollIntoView();
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.projectService.activeProject.subscribe(p => this.project = p);


    this.route.params.subscribe(({sequenceId}) => {
      if (!unpackEnum(SequenceDetailCRouteReservedParam).includes(sequenceId)) {
        this.dataItemId = sequenceId;
        this.fetch();
      }
      this.shouldSaveAsTopSequence = sequenceId === SequenceDetailCRouteReservedParam.TOP;
    });

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
      else {
        const prefix = this.route.snapshot.params['stepId'] ? '../../' : '../';
        const commands = [prefix, sequence.id, this.route.snapshot.params['stepId']];
        this.router.navigate(commands.filter(c => !!c), {relativeTo: this.route})
      }

      this.sequenceService.activeSequence.next(sequence);
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
