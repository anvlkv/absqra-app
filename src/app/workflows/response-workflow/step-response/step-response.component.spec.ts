import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { StepResponseComponent } from './step-response.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResponseService } from '../../../api/response.service';
import { mockResponseService } from '../../../api/response.service.mock';
import { anything, instance, verify } from 'ts-mockito';
import { CoreFormsModule } from '../../../core-forms/core-forms.module';
import { CoreContentModule } from '../../../core-content/core-content.module';
import { FormsSchemaService } from '../../../core-forms/forms-schema.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { mockFormsSchemaService } from '../../../core-forms/forms-schema.service.mock';
import { Observable } from 'rxjs/Observable';
import { sequence } from '../../../../fixtures/sequence.fixture';

describe('StepResponseComponent', () => {
  let component: StepResponseComponent;
  let fixture: ComponentFixture<StepResponseComponent>;
  let rsmock;
  let qSetter;

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
        CoreContentModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {
          provide: FormsSchemaService,
          useValue: (() => {
              const fs = new FormsSchemaService(new FormBuilder());
              qSetter = spyOnProperty(fs, 'questionnaire', 'set');
              spyOn(fs, 'getFg').and.returnValue(instance(mockFormsSchemaService()).getFg());
              return fs;
          })()
        },
        {
          provide: ResponseService,
          useValue: (() => {
            const rs = {
              nextStep: () => {},
              saveStepResponse: () => {},
              getStep: () => {},
              getSequence: () => {},
              set$sequence: () => {}
            };
            spyOn(rs, 'nextStep').and.returnValue(Observable.of(sequence.steps[1]));
            spyOn(rs, 'saveStepResponse').and.returnValue(Observable.of(true));
            spyOn(rs, 'getStep').and.returnValue(Observable.of(sequence.steps[0]));
            spyOn(rs, 'getSequence').and.returnValue(Observable.of(sequence));
            return rs;
          })()
        }
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

  it('should subscribe for step', async(inject([ResponseService], (rs: ResponseService) => {
    // verify(rsmock.getStep()).once();
    expect(rs.getStep).toHaveBeenCalled();
  })));

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

  it('should submit form with values', async(inject([FormsSchemaService, ResponseService], (fs: FormsSchemaService, rs: ResponseService) => {
    fs.getFg().subscribe(() => {
      fixture.detectChanges();
      fixture.elementRef.nativeElement.querySelector('button[type=submit]').click();
      // verify(rsmock.saveStepResponse(anything())).called();
      expect(rs.saveStepResponse).toHaveBeenCalledWith(component.response.getRawValue());
    });
  })));

  it('should request next step when form is accepted', async(inject([FormsSchemaService, ResponseService], (fs: FormsSchemaService, rs: ResponseService) => {
    fs.getFg().subscribe(() => {
      fixture.detectChanges();
      fixture.elementRef.nativeElement.querySelector('button[type=submit]').click();
      fixture.detectChanges();
      expect(rs.nextStep).toHaveBeenCalled();
    });
  })));

  it('should set questionnaire on FormsSchemaService', async(() => {
    expect(qSetter).toHaveBeenCalled();
  }));

  // it('should request next step when form is accepted', async(() => {
  //   verify(rsmock.getStep()).once()
  // }));
});
