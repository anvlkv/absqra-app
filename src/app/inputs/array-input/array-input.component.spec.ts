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
      expect(fixture.nativeElement.querySelectorAll('app-default-input').length).toEqual(3 /* one question initially added */);
    }));

    it('should remove items', () => {
      component.value = [
        {
          content: 'a',
          isOriginal: true
        },
        {
          content: 'b',
          isOriginal: true
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
        content: 10,
        isOriginal: true,
        origin: 'source'
      };
      fixture.detectChanges();
    });

    it('should create first item', () => {
      expect(component.value).toEqual([
        {content: 10, origin: 'source', isOriginal: true}
      ]);
    });
  });

  describe('with value', () => {
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ArrayInputComponent);
      component = fixture.componentInstance;
      component.archetype = {
        type: InputTypes.text,
        content: null,
        isOriginal: true,
      };

      component.value = [
        {
          content: 'a',
          origin: 'c',
          isOriginal: false
        },
        {
          content: 'b',
          origin: 'd',
          isOriginal: false
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
          content: 'new value',
          origin: 'new src 1',
          isOriginal: false
        },
        {
          content: 'new value 2',
          origin: 'new src 2',
          isOriginal: false
        },
        {
          content: 'new value 3',
          origin: 'new src 3',
          isOriginal: false
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
          content: 'a',
          origin: 'e',
          isOriginal: false
        },
        {
          content: 'b',
          origin: 'f',
          isOriginal: false
        },
        {
          content: 'c',
          origin: 'j',
          isOriginal: false
        },
        {
          content: 'd',
          origin: 'k',
          isOriginal: false
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
            content: 'd',
            origin: 'k',
            isOriginal: false
          },
          {
            content: 'b',
            origin: 'f',
            isOriginal: false
          },
          {
            content: 'c',
            origin: 'j',
            isOriginal: false
          },
          {
            content: 'a',
            origin: 'e',
            isOriginal: false
          },
        ]);
      })();

    }));
  });

  describe('with constraints', () => {
    xit('should constrain minimum question count', () => {
      expect(null).toBeTruthy();
    });

    xit('should constrain maximum question count', () => {
      expect(null).toBeTruthy();
    });
  });
});
