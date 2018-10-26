import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTextComponent } from './large-text.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LargeTextComponent', () => {
  let component: LargeTextComponent;
  let fixture: ComponentFixture<LargeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeTextComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
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
