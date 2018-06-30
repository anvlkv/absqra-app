import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceDetailComponent } from './sequence-detail.component';
import { anything, instance, mock, when } from 'ts-mockito';
import { DataService } from '../../app-common/data.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('SequenceDetailComponent', () => {
  let component: SequenceDetailComponent;
  let fixture: ComponentFixture<SequenceDetailComponent>;
  let mockedData: DataService;
  beforeEach(async(() => {
    mockedData = mock(DataService);
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
          provide: DataService,
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
