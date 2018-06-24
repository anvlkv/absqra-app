import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ArrayInputComponent } from './array-input.component';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { InputTypes } from '../input-types.enum';

@Component({
  selector: 'app-test-cmp',
  template: `
    <app-array-input [archetype]="archetype" [(ngModel)]="value" (ngModelChanges)="onItemsChange($event)">
        <ng-template let-sortable>
          <input class="test-input-class" type="text" name="some" [(ngModel)]="sortable.item.content" (change)="onSingleItemChanged($event, sortable.item)">
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

  onSingleItemChanged(e, item) {
    if (!item.id) {
      this.value = [...this.value, {...item, id: new Date().valueOf() }]
    }
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
    beforeEach(async(() => {
      testWrapperComponent.archetype = {
        content: 'some content',
        isOriginal: true,
        origin: 'source'
      };
      hostFixture.detectChanges();
      component.ngOnInit();
      hostFixture.detectChanges();
      // (async() => {
      //   await hostFixture.whenStable();
      // })();
    }));

    it('should add placeholder - first item', async(() => {
      expect(fixture.nativeElement.querySelectorAll('.test-input-class').length).toEqual(1);
      expect(fixture.nativeElement.querySelector('.test-input-class').value).toEqual('some content');
    }));

    it('should not add items which are same as archetype', async(() => {
      const addButton = fixture.nativeElement.querySelector('button.add-item');
      hostFixture.detectChanges();
      (async() => {
        await hostFixture.whenStable();
        addButton.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        addButton.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
      })();
      expect(fixture.nativeElement.querySelectorAll('.test-input-class')[0].value).toEqual(component.archetype.content);
      expect(fixture.nativeElement.querySelectorAll('.test-input-class').length).toEqual(1 /* one question initially added */);
    }));

    it('should add items', async(() => {
      const inputsQuery = () => fixture.nativeElement.querySelectorAll('.test-input-class');
      const addButton = fixture.nativeElement.querySelector('button.add-item');


      inputsQuery()[0].value = 'new another value 1';
      inputsQuery()[0].dispatchEvent(new Event('change'));
      hostFixture.detectChanges();

      (async() => {
        await hostFixture.whenStable();
      })();

      addButton.click();
      hostFixture.detectChanges();

      inputsQuery()[1].value = 'new another value 2';
      inputsQuery()[1].dispatchEvent(new Event('change'));
      hostFixture.detectChanges();

      (async() => {
        await hostFixture.whenStable();
      })();

      addButton.click();
      hostFixture.detectChanges();

      (async() => {
        await hostFixture.whenStable();
      })();

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

        inputs = hostFixture.nativeElement.querySelectorAll('.test-input-class');
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

        let orderInputs = fixture.nativeElement.querySelectorAll('.item-order');
        orderInputs[0].value = 4;
        orderInputs[0].dispatchEvent(new Event('change'));
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        orderInputs = fixture.nativeElement.querySelectorAll('.item-order');
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
