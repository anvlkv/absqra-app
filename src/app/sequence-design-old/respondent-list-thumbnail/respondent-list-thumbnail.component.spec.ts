import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentListThumbnailComponent } from './respondent-list-thumbnail.component';

describe('RespondentListThumbnailComponent', () => {
  let component: RespondentListThumbnailComponent;
  let fixture: ComponentFixture<RespondentListThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentListThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentListThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
