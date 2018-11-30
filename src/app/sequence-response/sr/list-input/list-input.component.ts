import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../base-response';
import { ResponseService } from '../response.service';
import { TopSequenceUIService } from '../../top-sequence-executor/top-sequence-ui.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sr-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss'],
})
export class ListInputComponent extends BaseResponse implements OnInit {

  archetype: any;

  constructor(
    public responseService: ResponseService,
    public responseUI: TopSequenceUIService,
    public fb: FormBuilder,
  ) {
    super(responseService, responseUI, fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.archetype = this.fb.group({content: ''});
    const populatedResponse: any[] = this.question.responseAssets.length ? this.question.responseAssets : [{content: ''}];
    this.formGroup = this.fb.group({
      content: this.fb.control(
        [
        ...populatedResponse.map(r => this.fb.group({content: r.content}))
        ]
      ),
    });
  }

  save() {
    if (this.formGroup.valid) {
      this.responseService.responseValue = this.formGroup.value.content.map(fc => fc.value);
    }
  }

}
