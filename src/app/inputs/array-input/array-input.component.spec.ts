import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ArrayInputComponent } from './array-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement, OnInit } from '@angular/core';
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

    it('should add items', () => {
      component.addItem();
      component.addItem();
      component.addItem();

      fixture.detectChanges()

      expect(component.sortableItems.length).toEqual(6);
      expect(component.value).toEqual(['a', 'b', 'c', 'd', 'd', 'd']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(6);
    });

    it('should remove items', () => {
      component.removeItem(orderShift);
      fixture.detectChanges()


      expect(component.sortableItems.length).toEqual(2);
      expect(component.value).toEqual(['b', 'c']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(2);
    });

    it('should reorder items upwards', () => {
      component.onOrderChanged(orderShift, orderShift + 2);
      fixture.detectChanges()


      expect(component.sortableItems.length).toEqual(3);
      expect(component.value).toEqual(['c', 'a', 'b']);
      expect(fixture.debugElement.queryAll(By.css('.item-order')).length).toEqual(3);
    });

    it('should reorder items backwards', () => {
      component.onOrderChanged(orderShift + 2, orderShift);
      fixture.detectChanges()


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

  describe('in use', () => {
    @Component({
      selector: 'app-test-cmp',
      template: `
    <form [formGroup]="form">
      <app-array-input [archetype]="archetype" formControlName="array" class="test-component">
        <ng-template let-sortable let-i="itemIndex">
          <div [formGroup]="sortable.item">
            <input class="test-input-class" type="text" formControlName="string" (change)="sortable.onChange(form.value)" (focus)="sortable.onChange($event.target.value)" (blur)="sortable.onBlur($event.target.value)">
          </div>
        </ng-template>
      </app-array-input>
    </form>
  `,
    })
    class TestWrapperComponent implements OnInit {
      public archetype: any;
      public form: FormGroup;

      constructor(
        private fb: FormBuilder
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
      hostFixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display multiple items', fakeAsync(() => {
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
      console.log(component, hostFixture);
      expect(debugElement.nativeElement.querySelectorAll('.test-input-class').length).toEqual(3);
    }));

    it('should update value', () => {
      hostComponent.form.setValue({array: [
          {string: 'd'},
          {string: 'e'},
          {string: 'f'}
        ]
      });
      hostFixture.detectChanges();
      expect(component.value).toEqual([
        {string: 'd'},
        {string: 'e'},
        {string: 'f'}
      ]);
    });

    it('should add items', () => {
      expect(null).toBeTruthy();
    });

    it('should add items using archetype', () => {
      expect(null).toBeTruthy();
    });

    it('should remove items', () => {
      expect(null).toBeTruthy();
    });

    it('should reorder items on order change', () => {
      expect(null).toBeTruthy();
    });

    it('should reorder items on keyboard events', () => {
      expect(null).toBeTruthy();
    });

    it('should be valid', () => {
      expect(hostComponent.form.valid).toBeTruthy();
    });

    describe('with constraints', () => {
      it('should be invalid with min constraint', () => {
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be invalid with max constraint', () => {
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be invalid with both constraints', () => {
        expect(hostComponent.form.valid).toBeFalsy();
      });

      it('should be valid with both constraints', () => {
        expect(hostComponent.form.valid).toBeTruthy();
      });
    });
  });

});
