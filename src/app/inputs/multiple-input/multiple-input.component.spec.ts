import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInputComponent } from './multiple-input.component';

describe('MultipleInputComponent', () => {
  let component: MultipleInputComponent;
  let fixture: ComponentFixture<MultipleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with value', () => {
    it('should display correct number of inputs', () => {

    });

    it('should display checkboxes', () => {

    });

    it('should display radios', () => {

    });
  });



  describe('with constraints', () => {
    it('should allow "other..."', () => {

    });

    it('should constrain min selected', () => {

    });

    it('should constrain max selected', () => {

    });

    it('should allow "other..."', () => {

    });
  });

});
