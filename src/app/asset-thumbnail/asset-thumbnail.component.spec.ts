import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetThumbnailComponent } from './asset-thumbnail.component';

describe('AssetThumbnailComponent', () => {
  let component: AssetThumbnailComponent;
  let fixture: ComponentFixture<AssetThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
