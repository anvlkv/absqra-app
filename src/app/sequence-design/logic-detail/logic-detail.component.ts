import { Component, OnInit } from '@angular/core';
import { Logic, LogicTypes, Step } from 'models/api-models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../app-common/api-service/api.service';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { unpackEnum } from '../../utils';
import { FormatConstraintPurposes } from '../format-constraint-detail/format-constraint-detail.service';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, filter, mergeMap } from 'rxjs/operators';
import { DesignerRouter } from 'models/api-routes/DesignerRouter';
import { ProjectDetailService } from '../../project/project-detail/project-detail.service';
import { StepDetailService } from '../step-detail/step-detail.service';
import { BaseDetailForm } from '../../app-common/base-detail/base-detail-form';
import { LogicDetailService } from './logic-detail.service';


@Component({
  selector: 'app-logic-detail',
  templateUrl: './logic-detail.component.html',
  styleUrls: ['./logic-detail.component.scss', '../styles/sequence-design.scss']
})
export class LogicDetailComponent extends BaseDetailForm<Logic, LogicDetailService> implements OnInit {
  private logicForm: FormGroup;

  logicTypesOptions = unpackEnum(LogicTypes).filter(v => v !== LogicTypes.ALTERNATIVE);
  logicTypes = LogicTypes;
  formatConstraintPurposes = FormatConstraintPurposes;
  private referableSteps: Observable<Step>;

  constructor(
    logicService: LogicDetailService,
    fb: FormBuilder,
    private api: ApiService,
    private projectService: ProjectDetailService,
    private stepService: StepDetailService
  ) {
    super(logicService, fb);
  }

  ngOnInit() {
    super.ngOnInit();

    this.referableSteps = combineLatest(
      this.projectService.dataItemObservable,
      this.stepService.dataItemObservable.pipe(filter(step => !!step.id)),
    ).pipe(
      mergeMap(([project, step]) => {
        return this.api.getData(DesignerRouter.viewReferableSteps, {
          projectId: project.id,
          stepId: step.id
        })
      }),
      catchError((err) => {
        this.$state.next({state: ComponentDynamicStates.FAILING, err});
        return throwError(err);
      })
    );
  }
}
