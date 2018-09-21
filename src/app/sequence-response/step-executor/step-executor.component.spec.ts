import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepExecutorComponent } from './step-executor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StepExecutorComponent', () => {
  let component: StepExecutorComponent;
  let fixture: ComponentFixture<StepExecutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepExecutorComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
