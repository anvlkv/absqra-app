import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { SequenceResponseComponent } from './sequence-response.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ResponseService } from '../../../api/response.service';
import { GeneralDataService } from '../../../api/general-data.service';
// import { HttpModule, XHRBackend } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { instance, mock, verify, when } from 'ts-mockito';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { mockResponseService } from '../../../api/response.service.mock';


describe('SequenceResponseComponent', () => {
  let component: SequenceResponseComponent;
  let fixture: ComponentFixture<SequenceResponseComponent>;
  let rsmock;

  beforeEach(async(() => {
    rsmock = mockResponseService();

    TestBed.configureTestingModule({
      declarations: [
        SequenceResponseComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ResponseService,
          useValue: instance(rsmock)
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({sequenceId: 1, stepId: 0})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request sequence with id', () => {
    spyOn(component, 'setSequence');
    async(() => {
      expect(component.setSequence).toHaveBeenCalledWith(1, 0);
    });
  });

  it('should request step', () => {
    fixture.componentInstance.setSequence(1);
    async(() => {
      fixture.detectChanges();
      verify(rsmock.nextStep()).once();
    });
  });

  it('should navigate to just step', () => {
    const router = (<any>fixture.componentInstance).router;
    spyOn(router, 'navigate');
    async(() => {
      expect(router.naviagte).toHaveBeenCalledWith(['./', 1 ]);
    })
  });

  it('should display sequence title', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h2').innerText).toBeTruthy();
  });

  it('should display sequence description', () => {
    expect(fixture.debugElement.nativeElement.querySelector('p').innerText).toBeTruthy();
  });

});
