import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatConstraintListComponent } from './format-constraint-list.component';

describe('FormatConstraintListComponent', () => {
  let component: FormatConstraintListComponent;
  let fixture: ComponentFixture<FormatConstraintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatConstraintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatConstraintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
