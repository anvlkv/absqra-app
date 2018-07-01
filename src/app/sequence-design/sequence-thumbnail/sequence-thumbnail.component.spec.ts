import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceThumbnailComponent } from './sequence-thumbnail.component';

describe('SequenceThumbnailComponent', () => {
  let component: SequenceThumbnailComponent;
  let fixture: ComponentFixture<SequenceThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
