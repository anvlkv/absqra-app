import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseDetailComponent } from './response-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ResponseDetailComponent', () => {
  let component: ResponseDetailComponent;
  let fixture: ComponentFixture<ResponseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseDetailComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
