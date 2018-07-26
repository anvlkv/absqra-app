import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDetailComponent } from './step-detail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { FormsModule } from '@angular/forms';
import { QuestionThumbnailComponent } from '../question-thumbnail/question-thumbnail.component';
import { QuestionDetailComponent } from '../question-detail/question-detail.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskThumbnailComponent } from '../task-thumbnail/task-thumbnail.component';
import { LogicDetailComponent } from '../logic-detail/logic-detail.component';
import { LogicThumbnailComponent } from '../logic-thumbnail/logic-thumbnail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { DataService } from '../../app-common/data-service/data.service';

describe('StepDetailComponent', () => {
  let component: StepDetailComponent;
  let fixture: ComponentFixture<StepDetailComponent>;
  const dataMock = mock(DataService);
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        StepDetailComponent,
      ],
      imports: [
        FormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(dataMock)
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
