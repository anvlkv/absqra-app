import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../app-common/api.service';
import { Project } from '../../../api-models';
import { Observable, of } from 'rxjs';
import { AppCommonModule } from '../../app-common/app-common.module';
import { InputsModule } from '../../inputs/inputs.module';
import { ProjectThumbnailComponent } from '../project-thumbnail/project-thumbnail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';


class MockApi {
  getData() {
    return of(<Project[]>[{
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
        RouterTestingModule,
        InputsModule
      ],
      declarations: [
        ProjectListComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: DataService,
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

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
