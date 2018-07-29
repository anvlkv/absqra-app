import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ComponentDynamicStates, DynamicState, DynamicStateComponent } from './dynamic-state.component';
import { Component, DebugElement, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { By } from '@angular/platform-browser';


@Component({
  selector: 'app-test-cmp',
  template: `
    <app-dynamic-state [state]="state">
      <div class="test-content"></div>
    </app-dynamic-state>
  `,
})
class TestWrapperComponent implements OnInit {
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
        DynamicStateComponent
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


  });
});
