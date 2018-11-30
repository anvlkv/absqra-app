import { AfterViewInit, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ResponseService } from './response.service';
import { TopSequenceUIService } from '../top-sequence-executor/top-sequence-ui.service';
import { Question } from 'models/api-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentDynamicStates, DynamicState } from '../../app-common/dynamic-state/dynamic-state.component';
import { FormBuilder, FormGroup } from '@angular/forms';


export abstract class BaseResponse implements OnInit, AfterViewInit {
  $state = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
  state: Observable<DynamicState>;
  formGroup: FormGroup;


  @ViewChild('controls')
  controlsTemplate: TemplateRef<any>;


  @Input()
  question: Question;

  constructor(
    public responseService: ResponseService,
    public responseUI: TopSequenceUIService,
    public fb: FormBuilder
  ) {
    this.state = this.$state.asObservable();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.responseUI.$template.next(this.controlsTemplate);
  }

  sayNA() {
    this.responseService.responseValue = null;
  }

  save() {
    if (this.formGroup.valid) {
      this.responseService.responseValue = this.formGroup.value.content;
    }
  }

  reset() {
    this.formGroup.reset();
  }

}
