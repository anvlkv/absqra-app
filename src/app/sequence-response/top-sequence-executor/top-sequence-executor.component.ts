import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Sequence } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { FooterService } from '../../app-common/footer/footer.service';
import { StepExecutorComponent } from '../step-executor/step-executor.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-sequence-executor',
  templateUrl: './top-sequence-executor.component.html',
  styleUrls: ['./top-sequence-executor.component.scss']
})
export class TopSequenceExecutorComponent extends BaseDetail<Sequence> implements OnInit {

  private activatedStepId: string;

  constructor(
    data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private footer: FooterService
  ) {
    super(data);

    this.callConfigurator = (sequenceId, cause) => {
      switch (cause) {
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
    this.route.params.subscribe(({sequenceId, stepId}) => {
      this.dataItemId = sequenceId;
      this.fetch();
    });

    this.itemSetObservable.subscribe(loaded => {
      if (loaded) {
        this.setStep(this.dataItem.stepIds[0]);
      }
    })
  }

  // onStepRouteActivated(stepC: StepExecutorComponent) {
  //   combineLatest(
  //     this.itemSetObservable,
  //     stepC.itemSetObservable
  //   ).subscribe(([sequenceLoaded, stepLoaded]) => {
  //     if (sequenceLoaded && stepLoaded) {
  //       this.setStep(stepC.dataItemId);
  //     }
  //   });
  //
  //   stepC.idChange.subscribe(stepId => {
  //       this.setStep(stepId);
  //   });
  // }

  setStep(stepId) {
    const stepIndex = this.dataItem.stepIds.indexOf(stepId);
    if (stepIndex >= 0) {
      this.activatedStepId = stepId;
      this.footer.status.next(`step ${stepIndex + 1} of ${this.dataItem.stepIds.length}`);
    }
    else {
      throw new Error(`sequence does not contain step with id [${stepId}]`);
    }
  }

  nextStep() {
    const currentIndex = this.dataItem.stepIds.indexOf(this.activatedStepId);
    const nextStep = this.dataItem.stepIds[currentIndex + 1];
    if (nextStep) {
      this.setStep(nextStep);
    }
  }
}
