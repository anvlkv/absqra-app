import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatConstraintsListComponent } from './format-constraints-list.component';

describe('FormatConstraintsListComponent', () => {
  let component: FormatConstraintsListComponent;
  let fixture: ComponentFixture<FormatConstraintsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatConstraintsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatConstraintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
