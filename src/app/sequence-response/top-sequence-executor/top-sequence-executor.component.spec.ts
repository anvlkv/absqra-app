import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopSequenceExecutorComponent } from './top-sequence-executor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { anything, instance, mock, when } from 'ts-mockito';
import { of, Subject } from 'rxjs';
import { FooterService } from '../../app-common/footer/footer.service';
import { ApiService } from '../../app-common/api-service/api.service';

describe('TopSequenceExecutorComponent', () => {
  let component: TopSequenceExecutorComponent;
  let fixture: ComponentFixture<TopSequenceExecutorComponent>;
  let mockedData: ApiService;
  let mockedFooterService: FooterService;
  beforeEach(async(() => {
    mockedData = mock(ApiService);
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
          provide: ApiService,
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
