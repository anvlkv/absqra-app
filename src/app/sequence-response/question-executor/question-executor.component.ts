import { Component, OnInit } from '@angular/core';
import { BaseDetail } from '../../app-common/base-detail/base-detail';
import { Question, QuestionPresentationTypes } from 'models/api-models';
import { ResponseService } from '../sr/response.service';
import { QuestionExecutorService } from './question-executor.service';


@Component({
  selector: 'app-question-executor',
  templateUrl: './question-executor.component.html',
  styleUrls: ['./question-executor.component.scss'],
  providers: [QuestionExecutorService]
})
export class QuestionExecutorComponent extends BaseDetail<Question, QuestionExecutorService> implements OnInit {

  presentationTypes = QuestionPresentationTypes;

  constructor(
    questionService: QuestionExecutorService,
  ) {
    super(questionService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
