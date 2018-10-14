import { Input, OnInit } from '@angular/core';
import { ResponseService } from './response.service';
import { TopSequenceUIService } from '../top-sequence-ui.service';
import { Question } from '../../../models/api-models';


export abstract class BaseResponse implements OnInit {

  @Input()
  question: Question;

  constructor(
    public responseService: ResponseService,
    public responseUI: TopSequenceUIService
  ) {

  }

  ngOnInit() {

  }


}
