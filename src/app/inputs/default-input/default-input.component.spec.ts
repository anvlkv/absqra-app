import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DefaultInputComponent, InputTypes } from './default-input.component';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { AutoFocusDirective } from '../../old/autofocus.directive';

describe('DefaultInputComponent', () => {
  let component: DefaultInputComponent;
  let fixture: ComponentFixture<DefaultInputComponent>;
  let input: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DefaultInputComponent,
        AutoFocusDirective
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.value = {
      response: null,
      source: '1'
    };
    input = fixture.nativeElement.querySelector('input, textarea');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model value', fakeAsync(() => {
    input.value = 'new value';
    input.dispatchEvent(new Event('input'));
    tick();
    expect(component.value).toEqual({response: 'new value', source: '1'});
  }));

  it('should have correct type (email)', () => {
    component.type = InputTypes.email;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input[type=email]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.email-input-control')).toBeTruthy();
  });

  it('should have correct type (textarea)', () => {
    component.type = InputTypes.longText;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('textarea')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.textarea-input-control')).toBeTruthy();
  });

  it('should have source', () => {
    expect(component.value.source).toBeTruthy();
  });

  describe('with value', () => {
    it('should set value', fakeAsync(() => {
      component.value = {
        response: 'blah',
        source: '150'
      };
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(input.value).toEqual('blah');
    }));

    it('should set checked (checkbox)', fakeAsync(() => {
      component.type = InputTypes.checkbox;
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('input[type=checkbox]');

      expect(input.checked).toBeFalsy();

      component.value = {
        response: true,
        source: '150'
      };

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(input.checked).toBeTruthy();
    }));

    it('should set checked (radio)', fakeAsync(() => {
      component.type = InputTypes.radio;
      component.name = 'radio-name';
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('input[type=radio]');

      expect(input.checked).toBeFalsy();

      component.value = {
        response: '150',
        source: '150'
      };

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(input.checked).toBeTruthy();
    }));

    it('should update value', fakeAsync(() => {
      component.value = {
        response: 'blah',
        source: '150'
      };
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(input.value).toEqual('blah');


      component.value = {
        response: 'blah-blah',
        source: '160'
      };
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(input.value).toEqual('blah-blah');
    }));
  });

  describe('with constraints', () => {
    it('should set constraints', () => {
      component.type = InputTypes.number;
      component.max = 3;
      component.min = 1;

      fixture.detectChanges();

      expect(input.max).toEqual('3');
      expect(input.min).toEqual('1');
    });
  });

  describe('when changing configuration', () => {
    beforeEach(() => {
      component.type = InputTypes.checkbox;
      component.value = {
        response: true,
        source: '150'
      };

      fixture.detectChanges();
    });

    it('should change input type', fakeAsync(() => {
      input = fixture.nativeElement.querySelector('input[type=checkbox]');
      expect(input).toBeTruthy();
      component.type = InputTypes.tel;
      component.value = {
        response: 132,
        source: '150'
      };

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      input = fixture.nativeElement.querySelector('input[type=tel]');
      expect(input).toBeTruthy();
      expect(input.value).toEqual('132')
    }));

    it('should change input type within default case', fakeAsync(() => {
      component.type = InputTypes.tel;
      component.value = {
        response: 132,
        source: '150'
      };

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      component.type = InputTypes.email;
      component.value = {
        response: 'email@domain.com',
        source: '150'
      };

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      input = fixture.nativeElement.querySelector('input[type=email]');
      expect(input).toBeTruthy();
      expect(input.value).toEqual('email@domain.com');
    }));
  })
});
