import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../app-common/api.service';
import { Project } from '../../../api-models';
import { Observable } from 'rxjs/Observable';

class MockApi {
  getData() {
    return Observable.of(<Project[]>[{
      name: 'test project',
      description: 'test project description',
    }])
  }
}

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  // const apiMock = mock(ApiService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        ProjectListComponent
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApi
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
