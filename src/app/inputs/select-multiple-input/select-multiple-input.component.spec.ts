import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleInputComponent } from './select-multiple-input.component';

describe('SelectMultipleInputComponent', () => {
  let component: SelectMultipleInputComponent;
  let fixture: ComponentFixture<SelectMultipleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMultipleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultipleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
