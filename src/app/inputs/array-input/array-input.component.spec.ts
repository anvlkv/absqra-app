import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ArrayInputComponent } from './array-input.component';
import { FormsModule } from '@angular/forms';
import { DefaultInputComponent, InputTypes } from '../default-input/default-input.component';

describe('ArrayInputComponent', () => {
  let component: ArrayInputComponent;
  let fixture: ComponentFixture<ArrayInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArrayInputComponent,
        DefaultInputComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  describe('without data', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ArrayInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should add items', fakeAsync(() => {
      const addButton = fixture.nativeElement.querySelector('button.add-item');
      addButton.click();
      addButton.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('app-default-input').length).toEqual(3 /* one item initially added */);
    }));

    it('should remove items', () => {
      component.value = [
        {
          response: 'a'
        },
        {
          response: 'b'
        }
      ];
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('app-default-input').length).toEqual(2);

      const removeButton = fixture.nativeElement.querySelector('button.remove-item');
      removeButton.click();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('app-default-input').length).toEqual(1);
    });
  });

  describe('with archetype', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ArrayInputComponent);
      component = fixture.componentInstance;
      component.archetype = {
        type: InputTypes.number,
        response: 10,
        source: 'source'
      };
      fixture.detectChanges();
    });

    it('should create first item', () => {
      expect(component.value).toEqual([{response: 10, source: 'source'}]);
    });
  });

  describe('with value', () => {
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ArrayInputComponent);
      component = fixture.componentInstance;
      component.archetype = {
        type: InputTypes.text,
        response: null
      };

      component.value = [
        {
          response: 'a',
          source: 'c'
        },
        {
          response: 'b',
          source: 'd'
        }
      ];

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    it('should display multiple inputs', () => {
      const inputs = fixture.nativeElement.querySelectorAll('app-default-input input, app-default-input textarea');
      expect(inputs.length).toEqual(2);
    });


    it('should set value', () => {
      const inputs = fixture.nativeElement.querySelectorAll('app-default-input input, app-default-input textarea');
      expect(inputs[0].value).toEqual('a');
      expect(inputs[1].value).toEqual('b');
      expect(inputs[0].name).toEqual('c');
      expect(inputs[1].name).toEqual('d');
    });

    it('should update value', fakeAsync(() => {
      let inputs = fixture.nativeElement.querySelectorAll('app-default-input input, app-default-input textarea');
      expect(inputs[0].value).toEqual('a');
      expect(inputs[1].value).toEqual('b');
      expect(inputs[0].name).toEqual('c');
      expect(inputs[1].name).toEqual('d');

      component.value = [
        {
          response: 'new value',
          source: 'new src 1'
        },
        {
          response: 'new value 2',
          source: 'new src 2'
        },
        {
          response: 'new value 3',
          source: 'new src 3'
        }
      ];

      fixture.detectChanges();

      (async () => {
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();

        inputs = fixture.nativeElement.querySelectorAll('app-default-input input, app-default-input textarea');
        expect(inputs[0].value).toEqual('new value');
        expect(inputs[1].value).toEqual('new value 2');
        expect(inputs[2].value).toEqual('new value 3');
        expect(inputs[0].name).toEqual('new src 1');
        expect(inputs[1].name).toEqual('new src 2');
        expect(inputs[2].name).toEqual('new src 3');
      })();
    }));

    it('should reorder items', fakeAsync(() => {
      component.value = [
        {
          response: 'a',
          source: 'e'
        },
        {
          response: 'b',
          source: 'f'
        },
        {
          response: 'c',
          source: 'j'
        },
        {
          response: 'd',
          source: 'k'
        }
      ];
      fixture.detectChanges();

      (async () => {
        await fixture.whenStable();
        fixture.detectChanges();
        await fixture.whenStable();

        const orderInputs = fixture.nativeElement.querySelectorAll('.item-order');
        orderInputs[0].value = 4;
        orderInputs[0].dispatchEvent(new Event('change'));
        fixture.detectChanges();
        await fixture.whenStable();

        orderInputs[2].value = 1;
        orderInputs[2].dispatchEvent(new Event('change'));
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.value).toEqual([
          {
            response: 'd',
            source: 'k'
          },
          {
            response: 'b',
            source: 'f'
          },
          {
            response: 'c',
            source: 'j'
          },
          {
            response: 'a',
            source: 'e'
          },
        ]);
      })();

    }));
  });

  describe('with constraints', () => {
    xit('should constrain minimum item count', () => {
      expect(null).toBeTruthy();
    });

    xit('should constrain maximum item count', () => {
      expect(null).toBeTruthy();
    });
  });
});
