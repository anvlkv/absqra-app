import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../app-common/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Project } from '../../../api-models';

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
        ProjectDetailComponent
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
