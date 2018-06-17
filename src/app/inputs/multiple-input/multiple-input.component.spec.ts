import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MultipleInputComponent, MultipleInputTypes } from './multiple-input.component';

import { FormsModule } from '@angular/forms';

describe('MultipleInputComponent', () => {
  let component: MultipleInputComponent;
  let fixture: ComponentFixture<MultipleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultipleInputComponent
      ],
      imports: [
        FormsModule
      ]
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
    beforeEach(() => {
      component.value = [
        {
          content: 'a',
          origin: 'a',
          isOriginal: false
        },
        {
          content: 'b',
          origin: 'a',
          isOriginal: false
        },
      ];
      component.options = [
        {
          content: 'a',
          origin: 'a',
          isOriginal: false
        },
        {
          content: 'b',
          origin: 'a',
          isOriginal: false
        },
        {
          content: 'c',
          origin: 'a',
          isOriginal: false
        }
      ];
      fixture.detectChanges();
    });
    it('should display correct number of inputs', () => {
      expect(fixture.nativeElement.querySelectorAll('input').length).toEqual(3);
    });

    it('should display checkboxes', () => {
      component.type = MultipleInputTypes.checkbox;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('input[type=checkbox]')).toBeTruthy();
    });

    it('should display radios', () => {
      component.type = MultipleInputTypes.radio;
      component.value = [
        {
          content: 'a',
          origin: 'a',
          isOriginal: false
        }
      ];
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('input[type=radio]')).toBeTruthy();
    });
  });



  describe('with constraints', () => {
    xit('should allow "other..."', () => {

    });

    xit('should constrain min selected', () => {

    });

    xit('should constrain max selected', () => {

    });

    xit('should allow "other..."', () => {

    });
  });

});
