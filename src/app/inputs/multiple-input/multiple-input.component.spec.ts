import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MultipleInputComponent } from './multiple-input.component';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MultipleInputComponent', () => {
  let fixture: ComponentFixture<MultipleInputComponent>;
  let component: MultipleInputComponent;
  describe('class', () => {
    // let orderShift: number;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule
        ],
        declarations: [
          MultipleInputComponent
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

    describe('with options', () => {
      beforeEach(() => {
        component.options = ['a', 'b', 'c', 'd'];
        fixture.detectChanges();
      });

      it('should display options', () => {
        expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(4);
      });

      it('should throw error if options provided are the same', () => {
        spyOnProperty(component, 'options', 'set').and.callThrough();
        expect(() => {
          component.options = ['a', 'b', 'a', 'b'];
        }).toThrowError();
      });

      describe('with value', () => {
        beforeEach(() => {
          component.value = ['a', 'c'];
          fixture.detectChanges();
        });

        it('should set value', () => {
          expect(fixture.debugElement.queryAll(By.css('input[type="checkbox"]:checked')).length).toEqual(2);
        });

        it('should display radio buttons when selecting single option', () => {
          component.multiSelect = false;
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('input[type="radio"]'))).toBeTruthy();
        });

        it('should update value when ticking checkbox', () => {
          fixture.debugElement.queryAll(By.css('.selection-input:checked')).forEach(i => {
            i.nativeElement.click();
            fixture.detectChanges();
          });

          expect(component.value).toEqual([]);

          fixture.debugElement.queryAll(By.css('.selection-input')).forEach((input, i) => {
            if (!(i % 2)) {
              input.nativeElement.click();
              fixture.detectChanges();
            }
          });

          expect(component.value).toEqual(['a', 'c']);
        });

        it('should update value when toggling radio', () => {
          component.multiSelect = false;
          fixture.detectChanges();
          fixture.debugElement.queryAll(By.css('.selection-input'))[0].nativeElement.click();
          fixture.detectChanges();
          expect(component.value).toEqual(['a']);
          fixture.debugElement.queryAll(By.css('.selection-input'))[1].nativeElement.click();
          fixture.detectChanges();
          expect(component.value).toEqual(['b']);
        });
      });
    });



  });

  describe('with model driven forms', () => {
    @Component({
      selector: 'app-test-cmp',
      template: `
    <form [formGroup]="form">
      <app-multiple-input formControlName="multiple" class="test-component" [max]="max" [min]="min" [options]="options">
        <ng-template let-sortable let-i="itemIndex">
          <div class="test-content">
            {{sortable.item}}
          </div>
        </ng-template>
      </app-multiple-input>
    </form>
  `,
    })
    class TestWrapperComponent implements OnInit {
      form: FormGroup;
      min;
      max;
      private _v: any;
      private _s: any;
      options: string [];
      constructor(
        private fb: FormBuilder,
      ) {}

      ngOnInit(): void {
        this.options = ['a', 'b', 'c', 'd'];
        this.form = this.fb.group({
          multiple: this.fb.control(['a', 'c'])
        });

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
          MultipleInputComponent,
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
      expect(debugElement.nativeElement.querySelectorAll('.test-content').length).toEqual(4);
    }));

    it('should update value', inject([FormBuilder], () => {
      hostComponent.form.setValue({multiple: ['a', 'b', 'c']});
      hostFixture.detectChanges();
      expect(component.value).toEqual(['a', 'b', 'c']);
    }));

    it('should trigger value changes', () => {
      debugElement.nativeElement.querySelectorAll('.selection-input').forEach(i => {
        i.click();
        hostFixture.detectChanges();
      });

      expect(hostComponent.valueChangesSubscriber).toHaveBeenCalledTimes(4);
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
        hostComponent.form.setValue({multiple: ['a', 'b', 'c']});
        hostComponent.min = 1;
        hostComponent.max = 2;
        hostFixture.detectChanges();
        expect(hostComponent.form.valid).toBeFalsy();
      });

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
      <app-multiple-input name="multiple" [(ngModel)]="model.multiple" class="test-component" [max]="max" [min]="min" [options]="options">
        <ng-template let-sortable let-i="itemIndex">
          <div class="test-content">
            {{sortable.item}}
          </div>
        </ng-template>
      </app-multiple-input>
    </form>
  `,
    })
    class TestWrapperComponent implements OnInit {
      @ViewChild('form')
      public form: NgForm;
      public model: any = {};
      public min;
      public max;
      options: string [];

      constructor(
      ) {}

      ngOnInit(): void {
        this.options = ['a', 'b', 'c', 'd'];

        this.model = {
          multiple: ['a', 'c']
        };
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
          MultipleInputComponent,
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
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display multiple items', fakeAsync(() => {
      expect(debugElement.nativeElement.querySelectorAll('.test-content').length).toEqual(4);
    }));

    it('should update value', fakeAsync(() => {
      hostComponent.model = {multiple: ['a', 'b', 'c']};
      hostFixture.detectChanges();
      hostFixture.whenStable().then(() => {
        expect(component.value).toEqual(['a', 'b', 'c']);
      });
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
        hostComponent.model = {multiple: ['a', 'b', 'c']};
        hostComponent.min = 1;
        hostComponent.max = 2;
        hostFixture.detectChanges();
        hostFixture.whenStable().then(() => {
          expect(hostComponent.form.valid).toBeFalsy();
        });
      });

      it('should prevent selecting more items with max', async(() => {
        hostComponent.max = 2;
        hostFixture.detectChanges();
        debugElement.nativeElement.querySelector('.selection-input:not(:checked)').click();
        hostFixture.detectChanges();
        expect(component.value.length).toEqual(2);
        expect(hostComponent.form.valid).toBeTruthy();
      }));

      it('should be valid with both constraints', () => {
        hostComponent.min = 1;
        hostComponent.max = 4;
        expect(hostComponent.form.valid).toBeTruthy();
      });
    });
  });
});
