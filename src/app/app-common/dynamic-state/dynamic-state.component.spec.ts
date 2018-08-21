import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ComponentDynamicStates,
  DynamicState,
  DynamicStateComponent,
  stateCombinator,
} from './dynamic-state.component';
import { AfterViewInit, Component, DebugElement, ErrorHandler, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { By } from '@angular/platform-browser';
import { DynamicStateErrorHandler } from './dynamic-state-error.handler';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-test-err-cmp',
  template: `
    <div></div>
  `,
})
class TestErrorComponent implements AfterViewInit {
  ngAfterViewInit() {
    throw new Error('test error');
  }
}

@Component({
  selector: 'app-test-cmp',
  template: `
    <app-dynamic-state [state]="state">
      <div class="test-content"></div>
      <ng-template *ngIf="testError" #editingTemplate>
        <app-test-err-cmp></app-test-err-cmp>
      </ng-template>
      <ng-template *ngIf="testTemplate" #viewingTemplate>
        <div class="test-viewing-template"></div>
      </ng-template>
    </app-dynamic-state>
  `,
})
class TestWrapperComponent implements OnInit {
  public testError: boolean;
  public testTemplate: boolean;
  public state: Observable<DynamicState>;
  public $state = new Subject<DynamicState>();
  ngOnInit() {
    this.state = this.$state.asObservable();
  }
}

describe('DynamicStateComponent', () => {
  let component: DynamicStateComponent;
  // let fixture: ComponentFixture<DynamicStateComponent>;
  let hostFixture: ComponentFixture<TestWrapperComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent,
        TestErrorComponent,
        DynamicStateComponent
      ],
      providers: [
        {
          provide: ErrorHandler,
          useClass: DynamicStateErrorHandler
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestWrapperComponent);
    component = hostFixture.debugElement.children[0].componentInstance;
    hostFixture.detectChanges();
    component.ngOnInit();
    hostFixture.detectChanges();
    component.ngAfterContentInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with default templates', () => {
    it('should display loading state', async(() => {
      hostFixture.componentInstance.$state.next(ComponentDynamicStates.LOADING);
      hostFixture.detectChanges();
      expect((<DebugElement>hostFixture.debugElement.childNodes[0]).query(By.css('app-loading'))).toBeTruthy();
    }));

    it('should fallback to ng-content', async(() => {
      hostFixture.componentInstance.$state.next(ComponentDynamicStates.VIEWING);
      hostFixture.detectChanges();
      expect((<DebugElement>hostFixture.debugElement.childNodes[0]).query(By.css('.test-content'))).toBeTruthy();
      hostFixture.componentInstance.$state.next(ComponentDynamicStates.EDITING);
      hostFixture.detectChanges();
      expect((<DebugElement>hostFixture.debugElement.childNodes[0]).query(By.css('.test-content'))).toBeTruthy();
    }));

    xit('should display internal errors', async(() => {
      hostFixture.componentInstance.testError = true;
      hostFixture.detectChanges();
      component.ngAfterContentInit();
      hostFixture.componentInstance.$state.next(ComponentDynamicStates.EDITING);
      // const spy = spyOn(hostFixture, 'detectChanges');
      hostFixture.detectChanges();
      // expect(hostFixture.detectChanges).toThrowError('test error');
      expect((<DebugElement>hostFixture.debugElement.childNodes[0]).query(By.css('app-error'))).toBeTruthy();
      expect(component.stateContext.err).toBeTruthy();
    }));
  });

  describe('with provided templates', () => {
    beforeEach(() => {
      hostFixture.componentInstance.testTemplate = true;
      hostFixture.detectChanges();
    });

    it('should display provided template', () => {
      hostFixture.componentInstance.$state.next(ComponentDynamicStates.VIEWING);
      hostFixture.detectChanges();
      expect((<DebugElement>hostFixture.debugElement.childNodes[0]).query(By.css('.test-viewing-template'))).toBeTruthy
    });
  });

  describe('state combinator', () => {
    let state1, state2, state3, state4, state;

    beforeEach(() => {
      state1 = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
      state2 = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
      state3 = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
      state4 = new BehaviorSubject<DynamicState>(ComponentDynamicStates.LOADING);
      state = stateCombinator(state1, state2, state3, state4);
    });

    it('should combine states', () => {
      expect(state).toBeTruthy();
    });

    it('should combine states into one', () => {
      state.subscribe(s => {
        expect(s).toEqual(ComponentDynamicStates.LOADING);
      });
    });

    it('should not change to view before all', () => {
      // state3.next(ComponentDynamicStates.VIEWING);
      state4.next(ComponentDynamicStates.VIEWING);
      state.subscribe(s => {
        expect(s).not.toEqual(ComponentDynamicStates.VIEWING);
      });
    });
    it('should change to view after all', () => {
      state1.next(ComponentDynamicStates.VIEWING);
      state2.next(ComponentDynamicStates.VIEWING);
      state3.next(ComponentDynamicStates.VIEWING);
      state4.next(ComponentDynamicStates.VIEWING);
      state.subscribe(s => {
        expect(s).toEqual(ComponentDynamicStates.VIEWING);
      });
    });
  });
});
