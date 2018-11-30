import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionDetailComponent } from './question-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { anything, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../app-common/api-service/api.service';

describe('QuestionDetailComponent', () => {
  let component: QuestionDetailComponent;
  let fixture: ComponentFixture<QuestionDetailComponent>;
  let mockedData: ApiService;
  beforeEach(async(() => {
    mockedData = mock(ApiService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({
      id: 1,
      name: 'test',
      description: 'test'
    }));
    TestBed.configureTestingModule({
      declarations: [
        QuestionDetailComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        FormBuilder,
        {
          provide: ApiService,
          useFactory: () => instance(mockedData)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
