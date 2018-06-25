import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDynamicStates, DynamicState, DynamicStateComponent } from './dynamic-state.component';
import { AppCommonModule } from '../app-common.module';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-test-cmp',
  template: `
    <app-dynamic-state [state]="state">
      
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
