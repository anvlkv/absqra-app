import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseThumbnailComponent } from './response-thumbnail.component';

describe('ResponseThumbnailComponent', () => {
  let component: ResponseThumbnailComponent;
  let fixture: ComponentFixture<ResponseThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
