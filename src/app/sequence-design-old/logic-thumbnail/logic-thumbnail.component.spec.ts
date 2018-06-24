import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicThumbnailComponent } from './logic-thumbnail.component';

describe('LogicThumbnailComponent', () => {
  let component: LogicThumbnailComponent;
  let fixture: ComponentFixture<LogicThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
