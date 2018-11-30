import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-executor/top-sequence-ui.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sr-check-boxes',
  templateUrl: './check-boxes.component.html',
  styleUrls: ['./check-boxes.component.scss'],
})
export class CheckBoxesComponent extends BaseResponse implements OnInit {

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
      content: this.fb.control([])
    });
  }
}
