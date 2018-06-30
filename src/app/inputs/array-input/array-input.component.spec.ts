import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { AddAt, ArrayInputComponent } from './array-input.component';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ArrayInputComponent', () => {
  let fixture: ComponentFixture<ArrayInputComponent>;
  let component: ArrayInputComponent;
  describe('class', () => {
    let orderShift: number;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule
        ],
        declarations: [
          ArrayInputComponent
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ArrayInputComponent);
      component = fixture.componentInstance;
      component.value = ['a', 'b', 'c'];
      component.archetype = 'd';
      orderShift = component.orderShift = 42;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set value', () => {
      expect(component.sortableItems.length).toEqual(3);
      expect(component.value).toEqual(['a', 'b', 'c']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(3);
    });

    it('should add items at start or end', () => {
      component.addItem();
      component.addItem();
      fixture.detectChanges();

      component.addAt = AddAt.START;
      fixture.detectChanges();

      component.addItem();
      fixture.detectChanges();

      expect(component.sortableItems.length).toEqual(6);
      expect(component.value).toEqual(['d', 'a', 'b', 'c', 'd', 'd']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(6);
    });

    it('should remove items', () => {
      component.removeItem(orderShift);
      fixture.detectChanges();


      expect(component.sortableItems.length).toEqual(2);
      expect(component.value).toEqual(['b', 'c']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(2);
    });

    it('should reorder items upwards', () => {
      component.reorderItems(orderShift, orderShift + 2);
      fixture.detectChanges();


      expect(component.sortableItems.length).toEqual(3);
      expect(component.value).toEqual(['c', 'a', 'b']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(3);
    });

    it('should reorder items backwards', () => {
      component.reorderItems(orderShift + 2, orderShift);
      fixture.detectChanges();


      expect(component.sortableItems.length).toEqual(3);
      expect(component.value).toEqual(['b', 'c', 'a']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(3);
    });

    it('should display orderable list', () => {
      expect(fixture.debugElement.query(By.css('ol'))).toBeTruthy();
    });

    it('should display non-orderable list', () => {
      component.orderable = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('ul'))).toBeTruthy();
    });
  });

  describe('with model driven forms', () => {
    @Component({
      selector: 'app-test-cmp',
      template: `
    <form [formGroup]="form">
      <app-array-input [archetype]="archetype" formControlName="array" class="test-component" [max]="max" [min]="min" >
        <ng-template let-sortable let-i="itemIndex">
          <div [formGroup]="sortable.item" *ngIf="!ignoreContent">
            <input class="test-input-class" type="text" formControlName="string" (change)="sortable.onChange(form.value)" (focus)="sortable.onChange($event.target.value, sortable.order)" (blur)="sortable.onBlur($event.target.value)">
          </div>
        </ng-template>
      </app-array-input>
    </form>
  `,
    })
    class TestWrapperComponent implements OnInit {
      archetype: any;
      form: FormGroup;
      ignoreContent = false;
      min;
      max;
      private _v: any;
      private _s: any;

      constructor(
        private fb: FormBuilder,
      ) {}

      ngOnInit(): void {
        this.form = this.fb.group({
          array: this.fb.control(
            [
              this.fb.group({string: 'a'}),
              this.fb.group({string: 'b'}),
              this.fb.group({string: 'c'})
            ]
          )
        });

        this.archetype = this.fb.group({string: ''});

        this.form.valueChanges.subscribe(this.valueChangesSubscriber);
        this.form.statusChanges.subscribe(this.statusChangesSubscriber);
      }

      valueChangesSubscriber(v) {
        this._v = v;
      }
      statusChangesSubscriber(v) {
        this._s = v;
      }


    }

    let hostComponent: TestWrapperComponent;
    let hostFixture: ComponentFixture<TestWrapperComponent>;
    let debugElement: DebugElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule
        ],
        declarations: [
          ArrayInputComponent,
          TestWrapperComponent
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestWrapperComponent);
      hostComponent = hostFixture.componentInstance;
      debugElement = hostFixture.debugElement.query(By.css('.test-component'));
      component = debugElement.componentInstance;
      spyOn(hostComponent, 'valueChangesSubscriber');
      spyOn(hostComponent, 'statusChangesSubscriber');
      hostFixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display multiple items', fakeAsync(() => {
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
      expect(debugElement.nativeElement.querySelectorAll('.test-input-class').length).toEqual(3);
    }));

    it('should update value', inject([FormBuilder], (fb) => {
      hostComponent.form.setValue({array: [
          fb.group({string: 'd'}),
          fb.group({string: 'e'}),
          fb.group({string: 'f'})
        ]
      });
      hostFixture.detectChanges();
      expect(component.value.map(fc => fc.value)).toEqual([
        {string: 'd'},
        {string: 'e'},
        {string: 'f'}
      ]);
    }));

    it('should add items', () => {
      hostComponent.ignoreContent = true;
      hostFixture.detectChanges();
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      hostFixture.detectChanges();
      expect(component.value.length).toEqual(6);
    });

    it('should add items using archetype', () => {
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      hostFixture.detectChanges();
      expect(component.value.map(fc => fc.value)).toEqual([
        {string: 'a'},
        {string: 'b'},
        {string: 'c'},
        {string: ''},
        {string: ''},
        {string: ''}
      ]);
    });

    it('should remove items', () => {
      debugElement.nativeElement.querySelector('.remove-item').click();
      debugElement.nativeElement.querySelector('.remove-item').click();
      debugElement.nativeElement.querySelector('.remove-item').click();
      hostFixture.detectChanges();
      expect(component.value.length).toEqual(0);
    });

    it('should reorder items on order change', () => {
      let input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.value = 3;
      input.dispatchEvent(new Event('change'));
      hostFixture.detectChanges();

      expect(hostComponent.form.value.array[0].value.string).toEqual('b');

      input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.value = 3;
      input.dispatchEvent(new Event('change'));
      hostFixture.detectChanges();

      expect(component.value.map(fc => fc.value)).toEqual([
        {string: 'c'},
        {string: 'a'},
        {string: 'b'}
      ]);
    });

    it('should reorder items on keyboard events', () => {
      let input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowDown'}));
      hostFixture.detectChanges();

      expect(hostComponent.form.value.array[0].value.string).toEqual('b');

      input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowUp'}));
      hostFixture.detectChanges();

      expect(component.value.map(fc => fc.value)).toEqual([
        {string: 'a'},
        {string: 'c'},
        {string: 'b'}
      ]);
    });

    it('should trigger value changes', () => {
      debugElement.nativeElement.querySelector('.remove-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      const input = debugElement.nativeElement.querySelector('.test-input-class');
      input.value = 10;
      input.dispatchEvent(new Event('change'));

      hostFixture.detectChanges();
      expect(hostComponent.valueChangesSubscriber).toHaveBeenCalledTimes(3);
    });

    it('should be valid', () => {
      expect(hostComponent.form.valid).toBeTruthy();
    });

    describe('with constraints', () => {
      it('should be invalid with min constraint', () => {
        hostComponent.min = 10;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be invalid with max constraint', () => {
        hostComponent.max = 1;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be invalid with both constraints', () => {
        hostComponent.min = 1;
        hostComponent.max = 2;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should prevent adding more items with max', async(() => {
        hostComponent.max = 2;
        hostFixture.detectChanges();
        debugElement.nativeElement.querySelector('.add-item').click();
        hostFixture.detectChanges();
        expect(component.value.length).toEqual(3);
        expect(hostComponent.form.valid).toBeFalsy();
      }));

      it('should prevent removing items with min', async(() => {
        hostComponent.min = 10;
        hostFixture.detectChanges();
        debugElement.nativeElement.querySelector('.remove-item').click();
        hostFixture.detectChanges();
        expect(component.value.length).toEqual(3);
        expect(hostComponent.form.valid).toBeFalsy();
      }));

      it('should be valid with both constraints', () => {
        hostComponent.min = 1;
        hostComponent.max = 4;
        expect(hostComponent.form.valid).toBeTruthy();
      });

      it('should trigger status changes', () => {
        hostComponent.min = 10;
        hostFixture.detectChanges();
        expect(hostComponent.statusChangesSubscriber).toHaveBeenCalledTimes(1);
      });

    });
  });

  describe('with template driven forms', () => {
    @Component({
      selector: 'app-test-cmp',
      template: `
    <form #form="ngForm">
      <app-array-input [archetype]="archetype" name="array" [(ngModel)]="model.array" class="test-component" [max]="max" [min]="min">
        <ng-template let-sortable let-i="itemIndex">
          <div *ngIf="!ignoreContent">
            <input class="test-input-class" type="text" name="{{sortable.order}}.string" [(ngModel)]="sortable.item.string" (change)="sortable.onChange($event.target.value, sortable.order)" (focus)="sortable.onChange($event.target.value)" (blur)="sortable.onBlur($event.target.value)">
          </div>
        </ng-template>
      </app-array-input>
    </form>
  `,
    })
    class TestWrapperComponent implements OnInit {
      public archetype: any;
      @ViewChild('form')
      public form: NgForm;
      public model: any = {};
      public ignoreContent = false;
      public min;
      public max;
      constructor(
      ) {}

      ngOnInit(): void {
        this.model = {
          array: [
            {string: 'a'},
            {string: 'b'},
            {string: 'c'}
          ]
        };

        this.archetype = {string: ''};
      }
    }

    let hostComponent: TestWrapperComponent;
    let hostFixture: ComponentFixture<TestWrapperComponent>;
    let debugElement: DebugElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule
        ],
        declarations: [
          ArrayInputComponent,
          TestWrapperComponent
        ]
      })
      .compileComponents();
    }));

    beforeEach(fakeAsync(async () => {
      hostFixture = TestBed.createComponent(TestWrapperComponent);
      hostComponent = hostFixture.componentInstance;
      debugElement = hostFixture.debugElement.query(By.css('.test-component'));
      component = debugElement.componentInstance;
      hostFixture.detectChanges();
      await hostFixture.whenStable();
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display multiple items', fakeAsync(() => {
      expect(debugElement.nativeElement.querySelectorAll('.test-input-class').length).toEqual(3);
    }));

    it('should update value', fakeAsync(() => {
      hostComponent.model = { array: [
          {string: 'd'},
          {string: 'e'},
          {string: 'f'}
        ]
      };

      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(component.value).toEqual([
        {string: 'd'},
        {string: 'e'},
        {string: 'f'}
      ]);
    }));

    it('should add items', () => {
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      hostFixture.detectChanges();
      expect(component.value.length).toEqual(6);
    });

    it('should add items using archetype', fakeAsync(() => {
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      debugElement.nativeElement.querySelector('.add-item').click();
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
      expect(component.value).toEqual([
        {string: 'a'},
        {string: 'b'},
        {string: 'c'},
        {string: ''},
        {string: ''},
        {string: ''}
      ]);
    }));

    it('should remove items', () => {
      debugElement.nativeElement.querySelector('.remove-item').click();
      debugElement.nativeElement.querySelector('.remove-item').click();
      debugElement.nativeElement.querySelector('.remove-item').click();
      hostFixture.detectChanges();
      expect(component.value.length).toEqual(0);
    });

    it('should reorder items on order change', fakeAsync(() => {
      let input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.value = 3;
      input.dispatchEvent(new Event('change'));

      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(hostComponent.model.array[0].string).toEqual('b');

      input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.value = 3;
      input.dispatchEvent(new Event('change'));

      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(component.value).toEqual([
        {string: 'c'},
        {string: 'a'},
        {string: 'b'}
      ]);
    }));

    it('should reorder items on keyboard events', fakeAsync(() => {
      let input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowDown'}));

      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(hostComponent.model.array[0].string).toEqual('b');

      input = debugElement.nativeElement.querySelectorAll('.item-order')[0];
      input.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowUp'}));

      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(component.value).toEqual([
        {string: 'a'},
        {string: 'c'},
        {string: 'b'}
      ]);
    }));

    it('should be valid', () => {
      expect(hostComponent.form.valid).toBeTruthy();
    });

    describe('with constraints', () => {
      it('should be invalid with min constraint', () => {
        hostComponent.min = 10;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be invalid with max constraint', () => {
        hostComponent.max = 1;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be invalid with both constraints', () => {
        hostComponent.min = 1;
        hostComponent.max = 2;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should prevent adding more items with max', async(() => {
        hostComponent.max = 2;
        hostFixture.detectChanges();
        debugElement.nativeElement.querySelector('.add-item').click();
        hostFixture.detectChanges();
        expect(component.value.length).toEqual(3);
        expect(hostComponent.form.valid).toBeFalsy();
      }));

      it('should prevent removing items with min', async(() => {
        hostComponent.min = 10;
        hostFixture.detectChanges();
        debugElement.nativeElement.querySelector('.remove-item').click();
        hostFixture.detectChanges();
        expect(component.value.length).toEqual(3);
        expect(hostComponent.form.valid).toBeFalsy();
      }));

      it('should be valid with both constraints', () => {
        hostComponent.min = 1;
        hostComponent.max = 4;
        expect(hostComponent.form.valid).toBeTruthy();
      });
    });
  });

});
