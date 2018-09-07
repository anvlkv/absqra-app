import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatConstraintDetailComponent } from './format-constraint-detail.component';
import { DataService } from '../../app-common/data-service/data.service';
import { anything, instance, mock, when } from 'ts-mockito';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormatConstraintDetailComponent', () => {
  let mockedData: DataService;
  let component: FormatConstraintDetailComponent;
  let fixture: ComponentFixture<FormatConstraintDetailComponent>;

  beforeEach(async(() => {
    mockedData = mock(DataService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1}));
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        FormatConstraintDetailComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        FormBuilder,
        {
          provide: DataService,
          useFactory: () => instance(mockedData)
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormatConstraintDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});

