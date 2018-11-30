import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionExecutorComponent } from './question-executor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { anything, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { ApiService } from '../../app-common/api-service/api.service';

describe('QuestionExecutorComponent', () => {
  let component: QuestionExecutorComponent;
  let fixture: ComponentFixture<QuestionExecutorComponent>;
  let mockedData: ApiService;

  beforeEach(async(() => {
    mockedData = mock(ApiService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: '1'}));
    TestBed.configureTestingModule({
      declarations: [
        QuestionExecutorComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: ApiService,
          useFactory: () => instance(mockedData)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
