import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-executor/top-sequence-ui.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sr-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent extends BaseResponse {
  constructor(
    response: ResponseService,
    ui: TopSequenceUIService,
    fb: FormBuilder
  ) {
    super(response, ui, fb);
  }

  sayYes() {
    this.responseService.responseValue = true;
  }

  sayNo() {
    this.responseService.responseValue = false;
  }
}
