import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepResponseDetailComponent } from './step-response-detail.component';

describe('StepResponseDetailComponent', () => {
  let component: StepResponseDetailComponent;
  let fixture: ComponentFixture<StepResponseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepResponseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepResponseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
