import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxesComponent } from './check-boxes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CheckBoxesComponent', () => {
  let component: CheckBoxesComponent;
  let fixture: ComponentFixture<CheckBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxesComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
