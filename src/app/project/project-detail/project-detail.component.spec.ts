import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { anything, instance, mock, when } from 'ts-mockito';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HotKeysService } from '../../app-common/hot-keys-service/hot-keys.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../app-common/api-service/api.service';

describe('ProjectDetailComponent', () => {
  let mockedData: ApiService;
  let mockedHotkeys: HotKeysService;
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async(() => {
    mockedData = mock(ApiService);
    mockedHotkeys = mock(HotKeysService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1}));
    when(mockedHotkeys.on(anything())).thenReturn(of(false));
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ProjectDetailComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({projectId: 1}),
            snapshot: {}
          }
        },
        {
          provide: ApiService,
          useFactory: () => instance(mockedData)
        },
        {
          provide: HotKeysService,
          useFactory: () => instance(mockedHotkeys)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
