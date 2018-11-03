import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InFlowTipComponent } from './in-flow-tip.component';

describe('InFlowTipComponent', () => {
  let component: InFlowTipComponent;
  let fixture: ComponentFixture<InFlowTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InFlowTipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFlowTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
