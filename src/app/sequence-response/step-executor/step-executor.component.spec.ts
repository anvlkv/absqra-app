import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepExecutorComponent } from './step-executor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { anything, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../app-common/api-service/api.service';

describe('StepExecutorComponent', () => {
  let component: StepExecutorComponent;
  let fixture: ComponentFixture<StepExecutorComponent>;
  let mockedData: ApiService;

  beforeEach(async(() => {
    mockedData = mock(ApiService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: '1'}));
    TestBed.configureTestingModule({
      declarations: [
        StepExecutorComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: ApiService,
          useFactory: () => instance(mockedData)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 1}),
            snapshot: {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
