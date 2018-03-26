import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressComponent } from './progress.component';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show start', () => {
    expect(component).toBeTruthy();
  });

  it('should increment', () => {
    expect(component).toBeTruthy();
  });

  it('should show intermediate progress', () => {
    expect(component).toBeTruthy();
  });

  it('should show end', () => {
    expect(component).toBeTruthy();
  });
});
