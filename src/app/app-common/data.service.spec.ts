import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { of, range, throwError } from 'rxjs';
import { CRUDRouter } from '../../api-routes/CRUDRouter';
import { TestScheduler } from 'rxjs/testing';
import { cold as coldMarbles } from 'jasmine-marbles';
import { map } from 'rxjs/operators';

describe('DataService', () => {
  let mockedApi: ApiService;


  beforeEach(() => {
    mockedApi = mock(ApiService);
    when(mockedApi.getData(anything(), anything(), anything())).thenReturn(of({id: 0}));
    when(mockedApi.postData(anything(), anything(), anything(), anything())).thenReturn(of({id: 2}));
    when(mockedApi.patchData(anything(), anything(), anything(), anything())).thenReturn(of({id: 3}));
    when(mockedApi.deleteData(anything(), anything(), anything())).thenReturn(of({id: 4}));
    when(mockedApi.getData(anything(), deepEqual({id: 10}), anything())).thenReturn(throwError('error'));

    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: ApiService, useFactory: () => instance(mockedApi) }
      ]
    });
  });

  describe('direct communication', () => {
    it('should be created', inject([DataService], (service: DataService) => {
      expect(service).toBeTruthy();
    }));

    it('should get data', inject([DataService], (service: DataService) => {
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe();
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        anything())
      ).called();
    }));

    it('should post data', inject([DataService], (service: DataService) => {
      service.postData(CRUDRouter.entitySequence, {sequenceId: 1}, {data: 1}).subscribe();
      verify(mockedApi.postData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        deepEqual({data: 1}),
        anything())
      ).called();
    }));

    it('should patch data', inject([DataService], (service: DataService) => {
      service.patchData(
        CRUDRouter.entitySequence,
        {sequenceId: 1},
        [{op: 'add', path: '/data', value: 1}]).subscribe();
      verify(mockedApi.patchData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        deepEqual([{op: 'add', path: '/data', value: 1}]),
        anything())
      ).called();
    }));

    it('should delete data', inject([DataService], (service: DataService) => {
      service.deleteData(
        CRUDRouter.entitySequence,
        {sequenceId: 1}).subscribe();
      verify(mockedApi.deleteData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        anything())
      ).called();
    }));

    it('should pipe errors', inject([DataService], (service: DataService) => {
      expect(null).toBeTruthy();
      // service.deleteData(
      //   CRUDRouter.entitySequence,
      //   {sequenceId: 1}).subscribe();
      // verify(mockedApi.deleteData(
      //   deepEqual(CRUDRouter.entitySequence),
      //   deepEqual({sequenceId: 1}),
      //   anything())
      // ).called();
    }));
  });

  describe('store', () => {

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    beforeEach(() => {
      when(mockedApi.getData(anything(), anything(), anything())).thenReturn(coldMarbles('a', [{id: 0}]));
      // when(mockedApi.postData(anything(), anything(), anything(), anything())).thenReturn(of({id: 2}));
      // when(mockedApi.patchData(anything(), anything(), anything(), anything())).thenReturn(of({id: 3}));
      // when(mockedApi.deleteData(anything(), anything(), anything())).thenReturn(of({id: 4}));
      // when(mockedApi.getData(anything(), deepEqual({id: 10}), anything())).thenReturn(throwError('error'));
    });

    it('should not get same data repeatedly', inject([DataService], (service: DataService) => {
      testScheduler.run(({cold, hot, expectObservable, expectSubscriptions, flush}) => {
        const observable = service.getData(CRUDRouter.entitySequence, {sequenceId: 1});
        observable.subscribe();
        expectObservable(observable).toBe('aaa', [{id: 0}]);
        verify(mockedApi.getData(
          deepEqual(CRUDRouter.entitySequence),
          deepEqual({sequenceId: 1}),
          anything())
        ).once();
      });
      expect(null).toBeTruthy();

    }));

    it('should not get data that was posted', inject([DataService], (service: DataService) => {
      expect(null).toBeTruthy();
    }));

    it('should return updated value when getting after post', inject([DataService], (service: DataService) => {
      expect(null).toBeTruthy();
    }));

    it('should return updated value when getting after patch', inject([DataService], (service: DataService) => {
      expect(null).toBeTruthy();
    }));

    it('should get new value when getting after deletion', inject([DataService], (service: DataService) => {
      expect(null).toBeTruthy();
    }));
  });

});
