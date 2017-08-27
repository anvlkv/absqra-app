import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSequenceComponent } from './start-sequence.component';

describe('StartSequenceComponent', () => {
  let component: StartSequenceComponent;
  let fixture: ComponentFixture<StartSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartSequenceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
