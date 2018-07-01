import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceDetailComponent } from './sequence-detail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { FormsModule } from '@angular/forms';
import { StepListComponent } from '../step-list/step-list.component';
import { InputsModule } from '../../inputs/inputs.module';
import { StepDetailComponent } from '../step-detail/step-detail.component';
import { QuestionThumbnailComponent } from '../question-thumbnail/question-thumbnail.component';
import { QuestionDetailComponent } from '../question-detail/question-detail.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskThumbnailComponent } from '../task-thumbnail/task-thumbnail.component';
import { LogicDetailComponent } from '../logic-detail/logic-detail.component';
import { LogicThumbnailComponent } from '../logic-thumbnail/logic-thumbnail.component';
import { SequenceThumbnailComponent } from '../sequence-thumbnail/sequence-thumbnail.component';
import { AssetDetailComponent } from '../asset-detail/asset-detail.component';
import { AssetThumbnailComponent } from '../asset-thumbnail/asset-thumbnail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { DataService } from '../../app-common/data.service';

describe('SequenceDetailComponent', () => {
  let component: SequenceDetailComponent;
  let fixture: ComponentFixture<SequenceDetailComponent>;
  const dataMock = mock(DataService);
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        SequenceDetailComponent,

      ],
      imports: [
        FormsModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(dataMock)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
