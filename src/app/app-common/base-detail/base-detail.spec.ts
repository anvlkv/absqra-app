import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseDetail } from './base-detail';
import { Base } from '../../../api-models';
import { DataService } from '../data.service';
import { anyOfClass, anything, deepEqual, instance, mock, notNull, verify, when } from 'ts-mockito';
import { CRUD } from '../api.service';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { of, Subject, throwError } from 'rxjs';
import { buffer, bufferCount } from 'rxjs/operators';

describe('BaseDetail', () => {
  let mockedData: DataService;

  @Component({
    selector: 'app-test-cmp',
    template: '<div></div>',
  })
  class TestExtendingComponent extends BaseDetail<Base> {

    constructor(
      data: DataService
    ) {
      super(data);

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
  let component: TestExtendingComponent;
  let fixture: ComponentFixture<TestExtendingComponent>;
  beforeEach(() => {
    mockedData = mock(DataService);
    when(mockedData.getData(anything(), anything(), anything())).thenReturn(of({id: 1}));
    when(mockedData.getData(anything(), deepEqual({id: 0}), anything())).thenReturn(of({id: 0}));
    when(mockedData.postData(anything(), anything(), anything(), anything())).thenReturn(of({id: 2}));
    when(mockedData.patchData(anything(), anything(), anything(), anything())).thenReturn(of({id: 3}));
    when(mockedData.deleteData(anything(), anything(), anything())).thenReturn(of({id: 4}));
    when(mockedData.getData(anything(), deepEqual({id: 10}), anything())).thenReturn(throwError('error'));
    TestBed.configureTestingModule({
      imports: [
        // HttpClientTestingModule
      ],
      providers: [
        {
          provide: DataService,
          useFactory: () => instance(mockedData)
        }
      ],
      declarations: [
        TestExtendingComponent
      ]
    }).compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestExtendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch item with id', () => {
    component.id = 1;
    fixture.detectChanges();
    verify(mockedData.getData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), anything())).called();
    expect(component.dataItem.id).toEqual(1);
  });

  it('should fetch default item', () => {
    verify(mockedData.getData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 0}), anything())).called();
    fixture.detectChanges();
    console.log(component.defaultItem);
    expect(component.defaultItem.id).toEqual(0);
  });

  it('should refetch item on id changes', () => {
    component.id = 1;
    fixture.detectChanges();
    expect(component.dataItem.id).toEqual(1);
    component.id = 2;
    fixture.detectChanges();
    verify(mockedData.getData(anything(), deepEqual({id: 2}), anything())).called();
  });

  it('should save new item', () => {
    component.dataItem = {
      createdDate: new Date(0)
    };
    component.save();
    verify(mockedData.postData(deepEqual(CRUDRouter.repoProjects), anything(), notNull(), anything())).called();
    fixture.detectChanges();
    expect(component.id).toEqual(2);
    expect(component.dataItem).toBeTruthy();
  });

  it('should save new item using provided value', () => {
    component.save({
      createdDate: new Date(0)
    });
    verify(mockedData.postData(deepEqual(CRUDRouter.repoProjects), anything(), notNull(), anything())).called();
    fixture.detectChanges();
    expect(component.id).toEqual(2);
    expect(component.dataItem).toBeTruthy();
  });

  it('should update item', () => {
    component.id = 1;
    fixture.detectChanges();
    component.dataItem.createdDate = new Date(0);
    component.update();
    fixture.detectChanges();
    verify(mockedData.patchData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), anyOfClass(Array), anything())).called();
    expect(component.id).toEqual(3);
  });

  it('should update item using provided value', () => {
    component.id = 1;
    fixture.detectChanges();
    component.dataItem.createdDate = new Date(0);
    component.update({createdDate: new Date(100)});
    fixture.detectChanges();
    verify(mockedData.patchData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), deepEqual([{op: 'remove', path: '/id'}, {op: 'add', path: '/createdDate', value: '1970-01-01T00:00:00.100Z'}]), anything())).called();
  });

  it('should reset item', () => {
    component.id = 1;
    fixture.detectChanges();
    expect(component.dataItem.id).toEqual(1);
    component.dataItem.id = 3;
    expect(component.dataItem.id).toEqual(3);
    component.reset();
    expect(component.dataItem.id).toEqual(1);
  });

  it('should delete item', () => {
    component.id = 1;
    fixture.detectChanges();
    expect(component.dataItem).toBeTruthy();
    component.remove();
    fixture.detectChanges();
    verify(mockedData.deleteData(deepEqual(CRUDRouter.entityProject), deepEqual({id: 1}), anything())).called();
    expect(component.dataItem).toBeFalsy();
  });

  it('should change state', () => {
    const ready = new Subject();
    component.state.pipe(
      buffer(ready.asObservable())
    ).subscribe((b: any[]) => {
      expect(b).toEqual(['load', 'view', 'interim', 'view', 'interim', jasmine.anything(), jasmine.anything(), 'edit', 'interim', 'view'])
    });
    component.id = 1;
    component.dataItem.createdDate = new Date(0);
    component.update();
    component.remove();
    component.id = 10;
    component.id = null;
    component.edit();
    component.dataItem.createdDate = new Date(3);
    component.save();
    ready.next(true);
    fixture.detectChanges();
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
    component.id = 1;
    component.dataItem.createdDate = new Date(0);
    component.save();
  });
});
