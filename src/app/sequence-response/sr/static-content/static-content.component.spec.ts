import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContentComponent } from './static-content.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StaticContentComponent', () => {
  let component: StaticContentComponent;
  let fixture: ComponentFixture<StaticContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticContentComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
