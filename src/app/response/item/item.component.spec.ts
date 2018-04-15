import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { sequence } from '../../../fixtures/sequence.fixture';
import { ResponseService } from '../../api/response.service';
import { Observable } from 'rxjs/Observable';
import { mock, when } from 'ts-mockito';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '../../inputs/inputs.module';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  // const rsMock = mock(ResponseService);

  // when(rsMock.set$sequence(1)).thenReturn(Observable.of(sequence));
  // when(rsMock.saveStepResponse()).thenReturn()

  const rsMock: Partial<ResponseService> = {
    saveStepResponse: () => {}
  };

  beforeEach(async(() => {
    spyOn(rsMock, 'saveStepResponse').and.returnValue(Observable.of(true))

    TestBed.configureTestingModule({
      declarations: [
        ItemComponent
      ],
      imports: [
        FormsModule,
        InputsModule
      ],
      providers: [
        {
          provide: ResponseService,
          useValue: rsMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = sequence.steps[0].item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item form', () => {
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  describe('with item', () => {
    beforeEach(() => {
      component.item = sequence.steps[0].item;
      fixture.detectChanges();
    });
    it('should display inputs', () => {
      expect(fixture.nativeElement.querySelector('input')).toBeTruthy();
    });

    it('should submit item form with values', () => {
      // expect(component).toBeTruthy();

      component.itemForm.setValue([
        {
          source: '1:1',
          response: true,
        },
        {
          source: '1:2',
          response: false,
        },
      ]);

      fixture.detectChanges();
      fixture.nativeElement.querySelector('button[type=submit]').click();
      fixture.detectChanges();

      expect(rsMock.saveStepResponse).toHaveBeenCalledWith([
        {
          source: '1:1',
          response: true,
        },
        {
          source: '1:2',
          response: false,
        },
      ])
    });
  });
});
