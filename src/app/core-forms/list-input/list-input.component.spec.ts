import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInputComponent } from './list-input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsSchemaService } from '../forms-schema.service';
import { LoadingStateComponent } from '../../old/loading-state/loading-state.component';

describe('ListInputComponent', () => {
  let component: ListInputComponent;
  let fixture: ComponentFixture<ListInputComponent>;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListInputComponent,
        LoadingStateComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormsSchemaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fb = new FormBuilder();
    fixture = TestBed.createComponent(ListInputComponent);
    component = fixture.componentInstance;
    component.itemConfig = {type: 'email'};
    component.formArrayName = 'fa';
    fixture.detectChanges();
  });


  describe('with missing data', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create missing delta items on init', () => {
      component.min = 10;
      component.formGroup = fb.group({fa: fb.array([])});
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(10);
    });
  });

  describe('with data', () => {
    beforeEach(() => {
      component.formGroup = fb.group({fa: fb.array([fb.control('')])});
      fixture.detectChanges();
    });

    it('should switch ul and ol', () => {
      expect(fixture.elementRef.nativeElement.querySelector('ul')).toBeTruthy();
      component.orderedList = true;
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelector('ol')).toBeTruthy();
    });

    it('should display one item input', () => {
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelector('input')).toBeTruthy();
    });

    it('should add items', () => {
      const buttons = () => fixture.elementRef.nativeElement.querySelectorAll('button.add');

      buttons()[0].click();
      fixture.detectChanges();
      buttons()[1].click();
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(3);
      // console.log(component.formGroup.getRawValue());
    });

    it('should remove items', () => {
      let buttons = () => fixture.elementRef.nativeElement.querySelectorAll('button.add');

      buttons()[0].click();
      fixture.detectChanges();
      buttons()[1].click();
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(3);
      buttons = () => fixture.elementRef.nativeElement.querySelectorAll('button.remove');
      buttons()[2].click();
      buttons()[1].click();
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(1);
    });

    it('should validate length on adding item', () => {
      spyOn(component, 'validateItemCount');
      fixture.elementRef.nativeElement.querySelector('button.add').click();
      expect(component.validateItemCount).toHaveBeenCalledWith(1);
    });

    it('should validate length on removing item', () => {
      component.addItem(1);
      fixture.detectChanges();
      spyOn(component, 'validateItemCount');
      fixture.elementRef.nativeElement.querySelector('button.remove').click();
      expect(component.validateItemCount).toHaveBeenCalledWith(-1);
    });

    it('should constrain minimum number of items', () => {
      component.min = 3;
      fixture.detectChanges();
      component.removeItem(1);
      component.removeItem(2);
      component.removeItem(3);
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(3);
      expect(fixture.elementRef.nativeElement.querySelectorAll('button.remove').length).toEqual(0);
    });

    it('should constrain maximum number of items', () => {
      component.max = 3;
      fixture.detectChanges();
      component.addItem(1);
      component.addItem(1);
      component.addItem(1);
      component.addItem(1);
      component.addItem(1);
      fixture.detectChanges();
      expect(fixture.elementRef.nativeElement.querySelectorAll('input').length).toEqual(3);
      expect(fixture.elementRef.nativeElement.querySelectorAll('button.add').length).toEqual(0);
    });
  });

});
