import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceExecutorComponent } from './sequence-executor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SequenceExecutorComponent', () => {
  let component: SequenceExecutorComponent;
  let fixture: ComponentFixture<SequenceExecutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SequenceExecutorComponent
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
