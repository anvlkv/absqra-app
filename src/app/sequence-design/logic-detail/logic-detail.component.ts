import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Logic, LogicTypes, Step } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { formDeltaValue, unpackEnum } from '../../utils';
import { FormatConstraintPurposes } from '../format-constraint-detail/format-constraint-detail.component';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { DesignerRouter } from '../../../models/api-routes/DesignerRouter';
import { ProjectService } from '../../project/project.service';
import { StepService } from '../step-detail/step.service';


@Component({
  selector: 'app-logic-detail',
  templateUrl: './logic-detail.component.html',
  styleUrls: ['./logic-detail.component.scss', '../styles/sequence-design.scss']
})
export class LogicDetailComponent extends BaseDetail<Logic> implements OnInit {
  private logicForm: FormGroup;

  logicTypesOptions = unpackEnum(LogicTypes).filter(v => v !== LogicTypes.ALTERNATIVE);
  logicTypes = LogicTypes;
  formatConstraintPurposes = FormatConstraintPurposes;
  private referableSteps: Observable<Step>;

  constructor(
    data: DataService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private stepService: StepService
  ) {
    super(data);
    this.callConfigurator = (logicId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoLogics,
          }
        }
        default: {
          return {
            route: CRUDRouter.entityLogic,
            params: {logicId}
          }
        }
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();

    this.itemSetObservable.subscribe((loaded) => {
      const logic = loaded ? this.dataItem : this.defaultItem;
      this.logicForm = this.fb.group({
        ...logic,
        sourceStepId: this.fb.control(logic.sourceStepId || ''),
        destinationStepId: this.fb.control(logic.destinationStepId || ''),
        formatConstraintsIds: this.fb.control(logic.formatConstraintsIds || []),
        alternativesIds: this.fb.control(logic.alternativesIds || [])
      });

      this.logicForm.controls['formatConstraintsIds'].valueChanges.subscribe(ids => {
        if (ids.every(id => !!id)) {
          this.dataItem.formatConstraints = ids.map((id, i) => ({id, order: i}));
        }
      });

      this.logicForm.controls['alternativesIds'].valueChanges.subscribe(ids => {
        if (ids.every(id => !!id)) {
          this.dataItem.alternatives = ids.map((id, i) => ({id, order: i}));
        }
      });

      this.logicForm.controls['sourceStepId'].valueChanges.subscribe(id => {
        if (id) {
          this.dataItem.sourceStep = {id};
        }
      });

      this.logicForm.controls['destinationStepId'].valueChanges.subscribe(id => {
        if (id) {
          this.dataItem.destinationStep = {id};
        }
      });

      if (!loaded) {
        this.$state.next(ComponentDynamicStates.EDITING);
      }
      else {
        let edit = false;
        switch (logic.type) {
          case LogicTypes.SKIP:
            edit = !logic.destinationStepId || !logic.sourceStepId || !logic.formatConstraintsIds.length;
            break;
          case LogicTypes.REPLAY:
            edit = !logic.destinationStepId || !logic.sourceStepId || !logic.formatConstraintsIds.length;
            break;
          case LogicTypes.SWITCH:
            edit = !logic.sourceStepId || !logic.alternativesIds.length;
            break;
          case LogicTypes.ALTERNATIVE:
            edit = !logic.destinationStepId || !logic.formatConstraintsIds.length;
            break;
        }

        edit ? this.$state.next(ComponentDynamicStates.EDITING) : null;
      }

    });

    this.referableSteps = combineLatest(
      this.projectService.activeProject,
      this.stepService.activeStep,
    ).pipe(
      mergeMap(([project, step]) => {
        return this.data.getData(DesignerRouter.viewReferableSteps, {
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

  saveConstraint(e) {
    e ? e.preventDefault() : null;
    e ? e.stopPropagation() : null;
    if (this.logicForm.valid) {
      if (this.dataItemId) {
        this.update({...this.dataItem, ...formDeltaValue(this.logicForm.value)})
      }
      else {
        this.save({...this.dataItem, ...formDeltaValue(this.logicForm.value)});
      }
    }
    return false;
  }

}
