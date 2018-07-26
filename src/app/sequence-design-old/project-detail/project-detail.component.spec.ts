import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../app-common/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Project } from '../../../api-models';
import { RespondentListComponent } from '../respondent-list/respondent-list.component';
import { RespondentListsComponent } from '../respondent-list-list/respondent-lists.component';
import { SequenceDetailComponent } from '../sequence-detail/sequence-detail.component';
import { ResponseListComponent } from '../response-list/response-list.component';
import { RespondentListThumbnailComponent } from '../respondent-list-thumbnail/respondent-list-thumbnail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { StepListComponent } from '../step-list/step-list.component';
import { InputsModule } from '../../inputs/inputs.module';
import { StepDetailComponent } from '../step-detail/step-detail.component';
import { QuestionThumbnailComponent } from '../question-thumbnail/question-thumbnail.component';
import { QuestionDetailComponent } from '../question-detail/question-detail.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskThumbnailComponent } from '../task-thumbnail/task-thumbnail.component';
import { LogicThumbnailComponent } from '../logic-thumbnail/logic-thumbnail.component';
import { LogicDetailComponent } from '../logic-detail/logic-detail.component';
import { SequenceThumbnailComponent } from '../sequence-thumbnail/sequence-thumbnail.component';
import { AssetThumbnailComponent } from '../asset-thumbnail/asset-thumbnail.component';
import { AssetDetailComponent } from '../asset-detail/asset-detail.component';
import { FormatConstraintsListComponent } from '../format-constraints-list/format-constraints-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';

class MockApi {
  getData() {
    return of(<Project>{
      name: 'test project',
      description: 'test project description',
    })
  }
}

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        ProjectDetailComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: DataService,
          useClass: MockApi
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ projectId: 1 })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
