import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { BaseFormComponent } from './base-form.component';
import { YesNoInputComponent } from '../yes-no-input/yes-no-input.component';
import { PortalFormComponent } from '../portal-form/portal-form.component';
import { ListInputComponent } from '../list-input/list-input.component';
import { LoadingStateComponent } from '../../old/loading-state/loading-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsSchemaService } from '../forms-schema.service';
import { mockFormsSchemaService } from '../forms-schema.service.mock';
import { instance } from 'ts-mockito';

describe('BaseFormComponent', () => {
  let component: BaseFormComponent;
  let fixture: ComponentFixture<BaseFormComponent>;
  let fsmock;
  beforeEach(async(() => {
    fsmock = mockFormsSchemaService();

    TestBed.configureTestingModule({
      declarations: [
        BaseFormComponent,
        ListInputComponent,
        YesNoInputComponent,
        PortalFormComponent,
        LoadingStateComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: FormsSchemaService,
          useValue: instance(fsmock)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have loading state', () => {
    component.form = null;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('app-loading-state')).toBeTruthy()
  });

  it('should display form content when form is loaded', async(inject([FormsSchemaService], (fs) => {
    expect(fixture.elementRef.nativeElement.querySelector('.base-form-container')).toBeTruthy();
  })));

  it('should display one input when one is expected and nothing is offered', async(() => {
    expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(1);
  }));

  describe('with different configurations', () => {
    beforeEach(async(() => {
      component.config = null;
      component.form = null;
      fixture.detectChanges();
    }));

    it('should display multiple radio inputs', inject([FormsSchemaService], (fs) => {
      fs.getConfig('radios').subscribe(c => {
        component.config = c;
        fs.getFg('radios').subscribe(f => {
          component.form = f;
          fixture.detectChanges();
          expect(fixture.elementRef.nativeElement.querySelectorAll('input[type=radio]').length).toEqual(2);
        })
      });
    }));

    it('should display multiple checkbox inputs', inject([FormsSchemaService], (fs) => {
      fs.getConfig('checkboxes').subscribe(c => {
        fs.getFg('checkboxes').subscribe(f => {
          component.config = c;
          component.form = f;
          fixture.detectChanges();
          expect(fixture.elementRef.nativeElement.querySelectorAll('input[type=checkbox]').length).toEqual(2);
        });
      });
    }));

    it('should display list input', inject([FormsSchemaService], (fs) => {
      fs.getConfig('list').subscribe(c => {
        component.config = c;
        fs.getFg('list').subscribe(f => {
          component.form = f;
          fixture.detectChanges();
          expect(fixture.elementRef.nativeElement.querySelectorAll('app-list-input').length).toEqual(1);
        })
      });
    }));

    it('should display one yes-no input', inject([FormsSchemaService], (fs) => {
      fs.getConfig('y/n').subscribe(c => {
        component.config = c;
        fs.getFg('y/n').subscribe(f => {
          component.form = f;
          fixture.detectChanges();
          expect(fixture.elementRef.nativeElement.querySelectorAll('app-yes-no-input').length).toEqual(1);
        })
      });
    }));

    xit('should display one portal-form', () => {
      expect(fixture.elementRef.nativeElement.querySelectorAll('app-portal-form').length).toEqual(1);
    });
  });



});
