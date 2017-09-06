import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSequenceComponent } from './finish-sequence.component';

describe('FinishSequenceComponent', () => {
  let component: FinishSequenceComponent;
  let fixture: ComponentFixture<FinishSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
