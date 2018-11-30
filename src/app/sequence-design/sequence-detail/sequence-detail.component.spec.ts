import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceDetailComponent } from './sequence-detail.component';
import { anything, instance, mock, when } from 'ts-mockito';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from '../../app-common/api-service/api.service';

describe('SequenceDetailComponent', () => {
  let component: SequenceDetailComponent;
  let fixture: ComponentFixture<SequenceDetailComponent>;
  let mockedData: ApiService;
  beforeEach(async(() => {
    mockedData = mock(ApiService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1, header: {name: 'a', description: 'b', lifeCycle: 'c'}}));

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        SequenceDetailComponent
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
    fixture = TestBed.createComponent(SequenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
