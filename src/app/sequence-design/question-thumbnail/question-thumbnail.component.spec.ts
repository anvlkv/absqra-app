import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionThumbnailComponent } from './question-thumbnail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('QuestionThumbnailComponent', () => {
  let component: QuestionThumbnailComponent;
  let fixture: ComponentFixture<QuestionThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionThumbnailComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
