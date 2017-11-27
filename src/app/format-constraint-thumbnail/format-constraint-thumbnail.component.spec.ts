import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatConstraintThumbnailComponent } from './format-constraint-thumbnail.component';

describe('FormatConstraintThumbnailComponent', () => {
  let component: FormatConstraintThumbnailComponent;
  let fixture: ComponentFixture<FormatConstraintThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatConstraintThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatConstraintThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
