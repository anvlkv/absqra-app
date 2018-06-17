import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ArrayInputComponent } from './array-input.component';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { InputTypes } from '../input-types.enum';

@Component({
  selector: 'app-test-cmp',
  template: `
    <app-array-input [archetype]="archetype" [(ngModel)]="value" (ngModelChanges)="onItemsChange($event)" (change)="onItemsChange($event)">
        <ng-template let-sortable>
          <input class="test-input-class" type="text" name="some" [(ngModel)]="sortable.item.content" (ngModelChanges)="onSingleItemChanged($event)" (change)="onSingleItemChanged($event)">
        </ng-template>
    </app-array-input>
  `,
})
class TestWrapperComponent {
  public value: any[];
  public archetype: any;

  onItemsChange(e) {
    console.log(e);
  }

  onSingleItemChanged(e) {
    console.log(e);
  }
}

describe('ArrayInputComponent', () => {
  let component: ArrayInputComponent;
  let hostFixture: ComponentFixture<TestWrapperComponent>;
  let fixture: Partial<ComponentFixture<ArrayInputComponent>>;
  let testWrapperComponent: TestWrapperComponent;
  // let fixture: Element;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArrayInputComponent,
        TestWrapperComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestWrapperComponent);
    testWrapperComponent = hostFixture.componentInstance;
    component = hostFixture.debugElement.children[0].componentInstance;

    fixture = hostFixture.debugElement.children[0];
  });

  describe('without data', () => {
    beforeEach(async(() => {
      hostFixture.detectChanges();
      component.ngOnInit();
      // fixture.detectChanges();
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('with archetype', () => {
    beforeEach(fakeAsync(() => {
      testWrapperComponent.archetype = {
        content: 'some content',
        isOriginal: true,
        origin: 'source'
      };
      hostFixture.detectChanges();
      component.ngOnInit();
      tick();
      hostFixture.detectChanges();
      // fixture.detectChanges();
    }));

    it('should add placeholder - first item', async(() => {
      expect(fixture.nativeElement.querySelectorAll('.test-input-class').length).toEqual(1);
      expect(fixture.nativeElement.querySelector('.test-input-class').value).toEqual('some content');
    }));

    it('should add items', async(() => {
      const addButton = fixture.nativeElement.querySelector('button.add-item');
      hostFixture.detectChanges();
      addButton.click();
      hostFixture.detectChanges();
      addButton.click();
      hostFixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.test-input-class').length).toEqual(3 /* one question initially added */);
    }));
  });

  describe('with value', () => {
    beforeEach(fakeAsync(() => {
      testWrapperComponent.archetype = {
        type: InputTypes.text,
        content: null,
        isOriginal: true,
      };

      testWrapperComponent.value = [
        {
          content: 'a',
          origin: 'c',
          isOriginal: false,
          id: 1
        },
        {
          content: 'b',
          origin: 'd',
          isOriginal: false,
          id: 2
        }
      ];

      hostFixture.detectChanges();
      component.ngOnInit();
      tick();
      hostFixture.detectChanges();
    }));

    it('should remove items', () => {
      hostFixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.test-input-class').length).toEqual(2);

      const removeButton = fixture.nativeElement.querySelector('button.remove-item');
      removeButton.click();
      hostFixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.test-input-class').length).toEqual(1);
    });

    it('should display multiple inputs', async(() => {

      const inputs = fixture.nativeElement.querySelectorAll('.test-input-class');
      expect(inputs.length).toEqual(2);
    }));


    it('should set value', async(() => {
      const inputs = fixture.nativeElement.querySelectorAll('.test-input-class');
      expect(inputs[0].value).toEqual('a');
      expect(inputs[1].value).toEqual('b');
    }));

    it('should update value', async(() => {
      let inputs = fixture.nativeElement.querySelectorAll('.test-input-class');
      expect(inputs[0].value).toEqual('a');
      expect(inputs[1].value).toEqual('b');

      testWrapperComponent.value = [
        {
          content: 'new value',
          origin: 'new src 1',
          isOriginal: false,
          id: 0
        },
        {
          content: 'new value 2',
          origin: 'new src 2',
          isOriginal: false,
          id: 1
        },
        {
          content: 'new value 3',
          origin: 'new src 3',
          isOriginal: false,
          id: 2
        }
      ];

      hostFixture.detectChanges();

      (async () => {
        await hostFixture.whenStable();
        hostFixture.detectChanges();
        await hostFixture.whenStable();

        inputs = hostFixture.nativeElement.querySelectorAll('.test-input-class, .test-input-class');
        expect(inputs[0].value).toEqual('new value');
        expect(inputs[1].value).toEqual('new value 2');
        expect(inputs[2].value).toEqual('new value 3');
      })();
    }));

    it('should reorder items', fakeAsync(() => {
      testWrapperComponent.value = [
        {
          content: 'a',
          origin: 'e',
          isOriginal: false,
          id: 0
        },
        {
          content: 'b',
          origin: 'f',
          isOriginal: false,
          id: 1
        },
        {
          content: 'c',
          origin: 'j',
          isOriginal: false,
          id: 2
        },
        {
          content: 'd',
          origin: 'k',
          isOriginal: false,
          id: 3
        }
      ];
      hostFixture.detectChanges();

      (async () => {
        await hostFixture.whenStable();
        hostFixture.detectChanges();
        await hostFixture.whenStable();

        const orderInputs = fixture.nativeElement.querySelectorAll('.item-order');
        orderInputs[0].value = 4;
        orderInputs[0].dispatchEvent(new Event('change'));
        hostFixture.detectChanges();
        await hostFixture.whenStable();

        orderInputs[2].value = 1;
        orderInputs[2].dispatchEvent(new Event('change'));
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();

        expect(component.value).toEqual([
          {
            content: 'd',
            origin: 'k',
            isOriginal: false,
            id: 3
          },
          {
            content: 'b',
            origin: 'f',
            isOriginal: false,
            id: 1
          },
          {
            content: 'c',
            origin: 'j',
            isOriginal: false,
            id: 2
          },
          {
            content: 'a',
            origin: 'e',
            isOriginal: false,
            id: 0
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
