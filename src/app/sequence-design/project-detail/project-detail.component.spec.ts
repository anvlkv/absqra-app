import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../app-common/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Project } from '../../../api-models';
import { RespondentListComponent } from '../respondent-list/respondent-list.component';
import { RespondentListsComponent } from '../respondent-lists/respondent-lists.component';
import { SequenceDetailComponent } from '../sequence-detail/sequence-detail.component';
import { ResponseListComponent } from '../response-list/response-list.component';
import { RespondentListThumbnailComponent } from '../respondent-list-thumbnail/respondent-list-thumbnail.component';

class MockApi {
  getData() {
    return Observable.of(<Project>{
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
        ProjectDetailComponent,
        SequenceDetailComponent,
        ResponseListComponent,
        RespondentListThumbnailComponent,
        RespondentListsComponent,
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApi
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ projectId: 1 })
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
