import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepResponseComponent } from './step-response.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResponseService } from '../../../api/response.service';
import { mockResponseService } from '../../../api/response.service.mock';
import { instance, verify } from 'ts-mockito';
import { CoreFormsModule } from '../../../core-forms/core-forms.module';
import { LoadingStateComponent } from '../../../old/loading-state/loading-state.component';
import { CoreContentModule } from '../../../core-content/core-content.module';

describe('StepResponseComponent', () => {
  let component: StepResponseComponent;
  let fixture: ComponentFixture<StepResponseComponent>;
  let rsmock;

  beforeEach(async(() => {
    rsmock = mockResponseService();
    TestBed.configureTestingModule({
      declarations: [
        StepResponseComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CoreFormsModule,
        CoreContentModule
      ],
      providers: [
        ResponseService,
        {
          provide: ResponseService,
          useValue: instance(rsmock)
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe for step', async(() => {
    verify(rsmock.getStep()).once();
  }));

  it('should display step question content', async(() => {
    expect(fixture.elementRef.nativeElement.querySelector('app-base-content-item')).toBeTruthy();
  }));

  it('should display form when expected', async(() => {
    expect(fixture.elementRef.nativeElement.querySelector('form')).toBeTruthy();
  }));

  it('should display submission controls', async(() => {
    expect(fixture.elementRef.nativeElement.querySelector('button[type=submit]')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelector('button[type=reset]')).toBeTruthy();
  }));

  it('should submit form with values', async(() => {
    // verify(rsmock.getStep()).once()
    expect(null).toBeTruthy();
  }));

  it('should request next step when form is accepted', async(() => {
    // verify(rsmock.getStep()).once()
    expect(null).toBeTruthy();
  }));

  // it('should request next step when form is accepted', async(() => {
  //   verify(rsmock.getStep()).once()
  // }));
});
