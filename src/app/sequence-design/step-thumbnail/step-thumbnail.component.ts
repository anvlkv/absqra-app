import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseThumbnail } from '../../app-common/base-thumbnail/base-thumbnail';
import { Step, StepTypes } from 'models/api-models';
import { DataService } from '../../app-common/data-service/data.service';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';


@Component({
  selector: 'app-step-thumbnail',
  templateUrl: './step-thumbnail.component.html',
  styleUrls: ['./step-thumbnail.component.scss']
})
export class StepThumbnailComponent extends BaseThumbnail<Step> implements OnChanges {
  @Input()
  stepId: string;

  stepTypes = StepTypes;

  private $stepId: Subject<string>;

  constructor(
    private data: DataService
  ) {
    super();
    this.$stepId = new Subject<string>();
    this.$state.next(ComponentDynamicStates.LOADING);

    this.$stepId.asObservable().pipe(
      mergeMap(stepId => {
        return this.data.getData(CRUDRouter.entityStep, {stepId})
      })
    ).subscribe(step => {
      this.dataItem = step;
      this.$state.next(ComponentDynamicStates.VIEWING);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stepId.currentValue) {
      this.$stepId.next(this.stepId);
    }
  }
}
