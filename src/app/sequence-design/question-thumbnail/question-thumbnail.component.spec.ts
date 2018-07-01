import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionThumbnailComponent } from './question-thumbnail.component';

describe('QuestionThumbnailComponent', () => {
  let component: QuestionThumbnailComponent;
  let fixture: ComponentFixture<QuestionThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
