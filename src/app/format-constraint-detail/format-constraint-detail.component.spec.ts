import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatConstraintDetailComponent } from './format-constraint-detail.component';

describe('FormatConstraintDetailComponent', () => {
  let component: FormatConstraintDetailComponent;
  let fixture: ComponentFixture<FormatConstraintDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatConstraintDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatConstraintDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
