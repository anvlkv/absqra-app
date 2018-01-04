import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAnswerComponent } from './item-answer.component';

describe('ItemAnswerComponent', () => {
  let component: ItemAnswerComponent;
  let fixture: ComponentFixture<ItemAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
