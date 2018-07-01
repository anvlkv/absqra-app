import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailComponent } from './question-detail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { AssetThumbnailComponent } from '../asset-thumbnail/asset-thumbnail.component';
import { FormsModule } from '@angular/forms';
import { StepListComponent } from '../step-list/step-list.component';
import { AssetDetailComponent } from '../asset-detail/asset-detail.component';
import { FormatConstraintsListComponent } from '../format-constraints-list/format-constraints-list.component';
import { InputsModule } from '../../inputs/inputs.module';
import { StepDetailComponent } from '../step-detail/step-detail.component';
import { QuestionThumbnailComponent } from '../question-thumbnail/question-thumbnail.component';
import { TaskThumbnailComponent } from '../task-thumbnail/task-thumbnail.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { LogicThumbnailComponent } from '../logic-thumbnail/logic-thumbnail.component';
import { LogicDetailComponent } from '../logic-detail/logic-detail.component';
import { SequenceThumbnailComponent } from '../sequence-thumbnail/sequence-thumbnail.component';
import { SequenceDetailComponent } from '../sequence-detail/sequence-detail.component';
import { instance, mock } from 'ts-mockito';
import { DataService } from '../../app-common/data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('QuestionDetailComponent', () => {
  let component: QuestionDetailComponent;
  let fixture: ComponentFixture<QuestionDetailComponent>;
  const dataMock = mock(DataService);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        QuestionDetailComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(dataMock)
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
