import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Sequence } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { FooterService } from '../../app-common/footer/footer.service';
import { TopSequenceUIService } from '../top-sequence-ui.service';
import { ResponseService } from '../sr/response.service';

@Component({
  selector: 'app-sequence-executor',
  templateUrl: './top-sequence-executor.component.html',
  styleUrls: ['./top-sequence-executor.component.scss'],
  providers: [TopSequenceUIService]
})
export class TopSequenceExecutorComponent extends BaseDetail<Sequence> implements OnInit {

  private template: TemplateRef<any>;

  constructor(
    data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private footer: FooterService,
    private uiService: TopSequenceUIService,
    private ch: ChangeDetectorRef,
    public response: ResponseService
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
        this.response.sequence = this.dataItem;
      }
    });

    this.uiService.template.subscribe(t => {
      this.template = t;
      this.ch.detectChanges();
    });

    this.response.activeStep.subscribe(stepId => {
      const stepIndex = this.dataItem.stepIds.indexOf(stepId);
      if (stepIndex >= 0) {
        this.footer.status.next(`step ${stepIndex + 1} of ${this.dataItem.stepIds.length}`);
      }
    })
  }
}
