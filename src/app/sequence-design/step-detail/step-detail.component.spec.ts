import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDetailComponent } from './step-detail.component';
import { of } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';
import { StepTypes } from 'models/api-models';
import { SequenceDetailComponent } from '../sequence-detail/sequence-detail.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../app-common/api-service/api.service';

describe('StepDetailComponent', () => {
  let component: StepDetailComponent;
  let fixture: ComponentFixture<StepDetailComponent>;
  let mockedData: ApiService;

  beforeEach(async(() => {
    mockedData = mock(ApiService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1, type: StepTypes.QUESTION_REF}));
    TestBed.configureTestingModule({
      declarations: [
        StepDetailComponent
      ],
      imports: [
        ReactiveFormsModule
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
    fixture = TestBed.createComponent(StepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
