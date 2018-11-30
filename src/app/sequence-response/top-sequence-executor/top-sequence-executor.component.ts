import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Sequence } from 'models/api-models';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterService } from '../../app-common/footer/footer.service';
import { TopSequenceUIService } from './top-sequence-ui.service';
import { ResponseService } from '../sr/response.service';
import { TopSequenceExecutorService } from './top-sequence-executor.service';

@Component({
  selector: 'app-sequence-executor',
  templateUrl: './top-sequence-executor.component.html',
  styleUrls: ['./top-sequence-executor.component.scss'],
  providers: [TopSequenceUIService]
})
export class TopSequenceExecutorComponent extends BaseDetail<Sequence, TopSequenceExecutorService> implements OnInit {

  private controlsTemplate: TemplateRef<any>;

  constructor(
    topSequenceService: TopSequenceExecutorService,
    private route: ActivatedRoute,
    private router: Router,
    private footer: FooterService,
    private uiService: TopSequenceUIService,
    private ch: ChangeDetectorRef,
    public response: ResponseService
  ) {
    super(topSequenceService, false);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(({sequenceId, stepId}) => {
      this.dataItemId = sequenceId;
      this.dataItemService.fetch(this.dataItemId);
    });

    this.uiService.template.subscribe(t => {
      this.controlsTemplate = t;
      this.ch.detectChanges();
    });

    this.response.activeStep.subscribe(stepId => {
      const stepIndex = this.dataItem.stepsIds.indexOf(stepId);
      if (stepIndex >= 0) {
        this.footer.status.next(`step ${stepIndex + 1} of ${this.dataItem.stepsIds.length}`);
      }
    })
  }
}
