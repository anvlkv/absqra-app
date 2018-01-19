import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAnswerComponent } from './step-answer.component';

describe('StepAnswerComponent', () => {
  let component: StepAnswerComponent;
  let fixture: ComponentFixture<StepAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
