import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTextComponent } from './large-text.component';

describe('LargeTextComponent', () => {
  let component: LargeTextComponent;
  let fixture: ComponentFixture<LargeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
