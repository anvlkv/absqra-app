import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-ui.service';
import { FormBuilder } from '@angular/forms';
import { AssetBase } from '../../../../models/api-models';
import { ComponentDynamicStates } from '../../../app-common/dynamic-state/dynamic-state.component';


@Component({
  selector: 'app-sr-static-content',
  templateUrl: './static-content.component.html',
  styleUrls: ['./static-content.component.scss']
})
export class StaticContentComponent extends BaseResponse implements OnChanges {
  @Input()
  asset: AssetBase;

  constructor(
    response: ResponseService,
    ui: TopSequenceUIService,
    fb: FormBuilder
  ) {
    super(response, ui, fb);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.asset.currentValue) {
      this.$state.next(ComponentDynamicStates.VIEWING);
    }
  }

}
