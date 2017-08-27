import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemResponseComponent } from './item-response.component';

describe('ItemResponseComponent', () => {
  let component: ItemResponseComponent;
  let fixture: ComponentFixture<ItemResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemResponseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
