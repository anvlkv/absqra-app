import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Sequence } from 'models/api-models/sequence';
import { DataService } from '../../app-common/data-service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { FooterService } from '../../app-common/footer/footer.service';
import { StepExecutorComponent } from '../step-executor/step-executor.component';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-sequence-executor',
  templateUrl: './sequence-executor.component.html',
  styleUrls: ['./sequence-executor.component.scss']
})
export class SequenceExecutorComponent extends BaseDetail<Sequence> implements OnInit {

  private activatedStepId: number;

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
    this.route.params.subscribe(({sequenceId, stepId}) => {
      this.dataItemId = sequenceId;
      if (this.dataItem && stepId) {
        this.footer.status.next(`step ${this.dataItem.stepIds.indexOf(stepId) + 1} of ${this.dataItem.stepIds.length}`);
      }
    });

    super.ngOnInit();

    this.itemSetObservable.subscribe((loaded) => {
      const stepId = this.route.snapshot.params['stepId'];
      if (!stepId) {
        this.router.navigate([this.dataItem.stepIds[0]], {relativeTo: this.route});
      }
    });
  }

  onStepActivated(stepC: StepExecutorComponent) {
    // const stepId = stepC.dataItemId;
    stepC.itemSetObservable.subscribe(loaded => {
      if (loaded) {
        this.activatedStepId = stepC.dataItemId;
        this.footer.status.next(`step ${this.dataItem.stepIds.indexOf(this.activatedStepId) + 1} of ${this.dataItem.stepIds.length}`);
      }
    });

    stepC.idChange.subscribe(stepId => {
        this.activatedStepId = stepId;
        this.footer.status.next(`step ${this.dataItem.stepIds.indexOf(this.activatedStepId) + 1} of ${this.dataItem.stepIds.length}`);
    });
  }

  nextStep() {
    const currentIndex = this.dataItem.stepIds.indexOf(this.activatedStepId);
    if (this.dataItem.stepIds[currentIndex + 1]) {
      this.router.navigate([this.dataItem.stepIds[currentIndex + 1]], {relativeTo: this.route});
    }
  }
}
