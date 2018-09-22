import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSequenceExecutorComponent } from './top-sequence-executor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from '../../app-common/data-service/data.service';
import { anything, instance, mock, when } from 'ts-mockito';
import { of, Subject } from 'rxjs';
import { StepTypes } from 'models/api-models';
import { FooterService } from '../../app-common/footer/footer.service';

describe('TopSequenceExecutorComponent', () => {
  let component: TopSequenceExecutorComponent;
  let fixture: ComponentFixture<TopSequenceExecutorComponent>;
  let mockedData: DataService;
  let mockedFooterService: FooterService;
  beforeEach(async(() => {
    mockedData = mock(DataService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1}));
    mockedFooterService = {
      status: new Subject<string>()
    };

    TestBed.configureTestingModule({
      declarations: [
        TopSequenceExecutorComponent
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(mockedData)
        },
        {
          provide: FooterService,
          useValue: mockedFooterService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSequenceExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
