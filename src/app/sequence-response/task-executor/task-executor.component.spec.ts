import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutorComponent } from './task-executor.component';

describe('TaskExecutorComponent', () => {
  let component: TaskExecutorComponent;
  let fixture: ComponentFixture<TaskExecutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskExecutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
