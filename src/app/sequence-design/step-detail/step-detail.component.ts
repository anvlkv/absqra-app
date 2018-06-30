import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Step, StepTypes } from '../../../api-models';
import { DataService } from '../../app-common/data.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { CRUD } from '../../app-common/api.service';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { unpackEnum } from '../../utils';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss'],
})
export class StepDetailComponent extends BaseDetail<Step> implements OnInit{
  private $typeState = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);

  stepTypeState: Observable<DynamicState>;
  stepTypesList: string[];
  typeForm: FormGroup;
  // private _stepId: number;
  // get stepId(): number {
  //   return this._stepId;
  // }
  // @Input()
  // set stepId(id: number) {
  //   this._stepId = id;
  //   // this.fetchStep();
  // }
  //
  // @Output() stepIdChange = new EventEmitter<number>(true);
  //
  // constructor() { }
  //
  // ngOnInit() {
  // }

  constructor(
    data: DataService,
    private fb: FormBuilder
  ) {
    super(data);
    this.stepTypeState = this.$typeState.asObservable();
    this.stepTypesList = unpackEnum(StepTypes);
    this.callConfigurator = (stepId, cause, step) => {
      switch (cause) {
        case CRUD.CREATE: {
          return {
            route: CRUDRouter.repoSteps,
          };
        }
        default: {
          return {
            route: CRUDRouter.entityStep,
            params: {stepId},
          };
        }
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemSetObservable.subscribe((loaded) => {
      const step = loaded ? this.dataItem : this.defaultItem;
      this.typeForm = this.fb.group({type: step.type});
      this.typeForm.valueChanges.subscribe(v => {
        if (this.id) {
          this.dataItem.type = v.type;
          this.update();
        }
        else {
          this.$state.next(ComponentDynamicStates.EDITING);
          this.$typeState.next(ComponentDynamicStates.VIEWING);
        }
      });
    });
  }

  editType() {
    this.$typeState.next(ComponentDynamicStates.EDITING);
  }

  trackType(i, type) {
    return i;
  };
}
