import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledContentComponent } from './disabled-content.component';

describe('DisabledContentComponent', () => {
  let component: DisabledContentComponent;
  let fixture: ComponentFixture<DisabledContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
