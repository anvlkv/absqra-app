import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionDetailComponent } from './question-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';
import { anything, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('QuestionDetailComponent', () => {
  let component: QuestionDetailComponent;
  let fixture: ComponentFixture<QuestionDetailComponent>;
  let mockedData: DataService;
  beforeEach(async(() => {
    mockedData = mock(DataService);
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
          provide: DataService,
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
