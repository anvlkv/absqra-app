import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { BaseDetail } from './base-detail';
import { Base } from '../../../models/api-models';
import { DataService } from '../data-service/data.service';
import { anyOfClass, anything, deepEqual, instance, mock, notNull, verify, when } from 'ts-mockito';
import { CRUD } from '../api-service/api.service';
import { of, Subject, throwError } from 'rxjs';
import { buffer, bufferCount, delay } from 'rxjs/operators';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';
import { time } from 'jasmine-marbles';

describe('BaseDetail', () => {
  let mockedData: DataService;

  @Component({
    selector: 'app-test-cmp',
    template: '<div></div>',
  })
  class TestExtendingComponent extends BaseDetail<Base> {

    constructor(
      data: DataService,
      el: ElementRef,
    ) {
      super(data, el);

      this.callConfigurator = (id, cause) => {
        switch (cause) {
          case CRUD.CREATE: {
            return {
              route: CRUDRouter.repoProjects
            }
          }
          default: {
            return {
              route: CRUDRouter.entityProject,
              params: {id}
            }
          }
        }
      }
    }
  }
  
  @Component({
    selector: 'app-test-wrapper',
    template: '<app-test-cmp [dataItemId]="id" [dataItem]="dataItem"></app-test-cmp>'
  })
  class TestWrapperComponent {
    id;
    dataItem;
  }
  
  let component: TestExtendingComponent;
  let hostComponent: TestWrapperComponent;
  let hostFixture: ComponentFixture<TestWrapperComponent>;
  beforeEach(() => {
    mockedData = mock(DataService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1}));
    when(mockedData.getData(anything(), deepEqual({id: 0}), anything())).thenReturn(of({id: 0}));
    when(mockedData.postData(anything(), anything(), anything(), anything())).thenReturn(of({id: 2}));
    when(mockedData.patchData(anything(), anything(), anything(), anything())).thenReturn(of({id: 3}));
    when(mockedData.deleteData(anything(), anything(), anything())).thenReturn(of({id: 4}));
    when(mockedData.getData(anything(), deepEqual({id: 10}), anything())).thenReturn(throwError('error'));
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(mockedData)
        }
      ],
      declarations: [
        TestExtendingComponent,
        TestWrapperComponent
      ]
    }).compileComponents();
  });

  beforeEach(async(() => {
    hostFixture = TestBed.createComponent(TestWrapperComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostFixture.debugElement.childNodes[0].componentInstance;
    hostFixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch item with id', () => {
    hostComponent.id = 1;
    hostFixture.detectChanges();
    verify(mockedData.getData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), anything())).called();
    expect(component.dataItem.id).toEqual(1);
  });

  it('should fetch default item', () => {
    verify(mockedData.getData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 0}), anything())).called();
    hostFixture.detectChanges();
    expect(component.defaultItem.id).toEqual(0);
  });

  it('should refetch item on id changes', () => {
    hostComponent.id = 1;
    hostFixture.detectChanges();
    expect(component.dataItem.id).toEqual(1);
    hostComponent.id = 2;
    hostFixture.detectChanges();
    verify(mockedData.getData(anything(), deepEqual({id: 2}), anything())).called();
  });

  it('should save new item', () => {
    component.dataItem = {
      createdDate: new Date(0)
    };
    hostFixture.detectChanges();
    component.save();
    verify(mockedData.postData(deepEqual(CRUDRouter.repoProjects), anything(), notNull(), anything())).called();
    hostFixture.detectChanges();
    expect(component.dataItemId).toEqual(2);
    expect(component.dataItem).toBeTruthy();
  });

  it('should save new item using provided value', () => {
    component.save({
      createdDate: new Date(0)
    });
    verify(mockedData.postData(deepEqual(CRUDRouter.repoProjects), anything(), notNull(), anything())).called();
    hostFixture.detectChanges();
    expect(component.dataItemId).toEqual(2);
    expect(component.dataItem).toBeTruthy();
  });

  it('should update item', () => {
    const val = new Date(0);
    hostComponent.id = 1;
    hostFixture.detectChanges();
    component.dataItem.createdDate = val;
    component.update();
    hostFixture.detectChanges();
    verify(mockedData.patchData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), deepEqual([{
      "op": "add",
      "path": "/createdDate",
      "value": val.toISOString()
    }]), anything())).called();
    expect(component.dataItemId).toEqual(3);
  });

  it('should update item using provided value', () => {
    hostComponent.id = 1;
    hostFixture.detectChanges();
    component.dataItem.createdDate = new Date(0);
    component.update({createdDate: new Date(100)});
    hostFixture.detectChanges();
    verify(mockedData.patchData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), deepEqual([{op: 'remove', path: '/id'}, {op: 'add', path: '/createdDate', value: '1970-01-01T00:00:00.100Z'}]), anything())).called();
  });

  it('should reset item', () => {
    hostComponent.id = 1;
    hostFixture.detectChanges();
    expect(component.dataItem.id).toEqual(1);
    component.dataItem.createdDate = new Date();
    component.reset();
    expect(component.dataItem.createdDate).toBeFalsy();
  });

  it('should delete item', () => {
    hostComponent.id = 1;
    hostFixture.detectChanges();
    expect(component.dataItem).toBeTruthy();
    component.remove();
    hostFixture.detectChanges();
    verify(mockedData.deleteData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), anything())).called();
    expect(component.dataItem).toBeFalsy();
  });

  it('should change state', () => {
    const ready = new Subject();
    component.state.pipe(
      buffer(ready.asObservable())
    ).subscribe((b: any[]) => {
      expect(b).toEqual([
        'empty',
        'view',
        'interim',
        'view',
        'interim',
        {state: 'delete', deleted: jasmine.anything()},
        {state: 'fail', err: 'error'},
        'empty',
        'edit',
        'interim',
        'view']);
    });
    hostComponent.id = 1;
    hostFixture.detectChanges();
    component.dataItem.createdDate = new Date(0);
    component.update();
    component.remove();
    hostComponent.id = 10;
    hostFixture.detectChanges();
    hostComponent.id = null;
    hostFixture.detectChanges();
    component.edit();
    component.dataItem.createdDate = new Date(3);
    component.save();
    ready.next(true);
    hostFixture.detectChanges();
  });

  it('should set error state if default item fetch fails', () => {
    when(mockedData.getData(anything(), deepEqual({id: 0}), anything())).thenReturn(throwError('error'));
    component.fetchDefault();
    component.state.subscribe((state: any) => {
      expect(state).toEqual({state: 'fail', err: 'error'});
    });
  });

  it('should emit event when id is updated', () => {
    component.idChange.pipe(
      bufferCount(2)
    ).subscribe((b: number[]) => {
      expect(b).toEqual([1, 2]);
    });
    hostComponent.id = 1;
    hostFixture.detectChanges();
    component.dataItem.createdDate = new Date(0);
    component.save();
  });
});
