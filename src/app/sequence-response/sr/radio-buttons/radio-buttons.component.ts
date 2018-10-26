import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-ui.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sr-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent extends BaseResponse implements OnInit {

  constructor(
    public responseService: ResponseService,
    public responseUI: TopSequenceUIService,
    public fb: FormBuilder
  ) {
    super(responseService, responseUI, fb)
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this.fb.group({
      content: this.fb.control(null)
    });
  }

}
