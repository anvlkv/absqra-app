import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSingleInputComponent } from './select-single-input.component';

describe('SelectSingleInputComponent', () => {
  let component: SelectSingleInputComponent;
  let fixture: ComponentFixture<SelectSingleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSingleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSingleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
