import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-ui.service';

@Component({
  selector: 'app-sr-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent extends BaseResponse implements AfterViewInit {

  @ViewChild('controls')
  controlsTemplate: TemplateRef<any>;

  constructor(
    response: ResponseService,
    ui: TopSequenceUIService,
    private ch: ChangeDetectorRef
  ) {
    super(response, ui);
  }

  ngAfterViewInit() {
    this.responseUI.$template.next(this.controlsTemplate);
  }

  sayYes() {
    this.responseService.responseValue = true;
  }

  sayNo() {
    this.responseService.responseValue = false;
  }

  sayNA() {
    this.responseService.responseValue = null;
  }
}
