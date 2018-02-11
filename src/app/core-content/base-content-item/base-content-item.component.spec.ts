import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseContentItemComponent } from './base-content-item.component';
import { sequence } from '../../../fixtures/sequence.fixture';

describe('BaseContentItemComponent', () => {
  let component: BaseContentItemComponent;
  let fixture: ComponentFixture<BaseContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BaseContentItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseContentItemComponent);
    component = fixture.componentInstance;
    component.item = sequence.steps[0].item.assets[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display p', () => {
    expect(fixture.elementRef.nativeElement.querySelector('p')).toBeTruthy();
  });
});
