import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { DataService } from './data.service';
import { ApiService } from '../api-service/api.service';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { noop, of, throwError } from 'rxjs';
import { CRUDRouter } from 'models/api-routes/CRUDRouter';
import { bufferCount, mergeMap } from 'rxjs/operators';
import createSpy = jasmine.createSpy;

describe('DataService', () => {
  let mockedApi: ApiService;


  beforeEach(() => {
    mockedApi = mock(ApiService);
    when(mockedApi.getData(anything(), anything(), anything())).thenReturn(of({id: 1, data: 'some1'}));
    when(mockedApi.postData(anything(), anything(), anything(), anything())).thenReturn(of({id: 2, data: 'some2'}));
    when(mockedApi.patchData(anything(), anything(), anything(), anything())).thenReturn(of({id: 1, data: 1}));
    when(mockedApi.deleteData(anything(), anything(), anything())).thenReturn(of(null));
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

    it('should get without params', inject([DataService], (service: DataService) => {
      service.getData(CRUDRouter.entitySequence).subscribe();
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        anything(),
        anything())
      ).called();
    }));

    it('should post without params', inject([DataService], (service: DataService) => {
      service.postData(CRUDRouter.entitySequence, null, {data: 1}).subscribe();
      verify(mockedApi.postData(
        deepEqual(CRUDRouter.entitySequence),
        anything(),
        deepEqual({data: 1}),
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
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe();

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
      service.getData(
        CRUDRouter.entitySequence,
        {sequenceId: 10}).subscribe(noop, err => expect(err).toBeTruthy());
    }));
  });

  describe('caching', () => {

    beforeEach(() => {
      when(mockedApi.getData(deepEqual(CRUDRouter.entitySequence), anything(), anything())).thenReturn(of({id: 1, data: 'some1'}));
      when(mockedApi.getData(deepEqual(CRUDRouter.repoSequences), anything(), anything())).thenReturn(of([{id: 1, data: 'some1'}, {id: 2, data: 'some2'}, {id: 3, data: 'some3'}]));
      when(mockedApi.postData(anything(), anything(), anything(), anything())).thenReturn(of({id: 2, data: 'some2'}));
      // when(mockedApi.patchData(anything(), anything(), anything(), anything())).thenReturn(of({id: 3}));
      when(mockedApi.deleteData(anything(), anything(), anything())).thenReturn(of({id: 1, data: 'some1'}));
      // when(mockedApi.getData(anything(), deepEqual({id: 10}), anything())).thenReturn(throwError('error'));
    });

    it('should not get same data repeatedly', inject([DataService], (service: DataService) => {
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe(val => {
        expect(val).toEqual({id: 1, data: 'some1'});
      });
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe(val => {
        expect(val).toEqual({id: 1 , data: 'some1'});
      });
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe(val => {
        expect(val).toEqual({id: 1, data: 'some1'});
      });
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        anything())
      ).once();
    }));

    it('should get multiple entries once', fakeAsync(inject([DataService], (service: DataService) => {
      const resolved = [];
      service.getData(CRUDRouter.repoSequences).subscribe(val => {
        expect(val).toEqual([{id: 1, data: 'some1'}, {id: 2, data: 'some2'}, {id: 3, data: 'some3'}]);
        resolved.push(val);
      });
      tick();
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe(val => {
        expect(val).toEqual({id: 1, data: 'some1'});
        resolved.push(val);
      });
      service.getData(CRUDRouter.entitySequence, {sequenceId: 2}).subscribe(val => {
        expect(val).toEqual({id: 2, data: 'some2'});
        resolved.push(val);
      });
      service.getData(CRUDRouter.entitySequence, {sequenceId: 3}).subscribe(val => {
        expect(val).toEqual({id: 3, data: 'some3'});
        resolved.push(val);
      });

      expect(resolved.length).toEqual(4);
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.repoSequences),
        anything(),
        anything())
      ).once();
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        anything(),
        anything())
      ).never();
    })));

    it('should not get data that was posted', fakeAsync(inject([DataService], (service: DataService) => {
      service.postData(CRUDRouter.repoSequences, {}, {value: 'some'}).subscribe(val => {
        expect(val).toEqual({id: 2, data: 'some2'});
      });
      tick();
      service.getData(CRUDRouter.entitySequence, {sequenceId: 2}).subscribe(val => {
        expect(val).toEqual({id: 2, data: 'some2'});
      });
      tick();
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        anything(),
        anything())
      ).never();
    })));

    it('should update store item when posting', inject([DataService], (service: DataService) => {

      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).pipe(bufferCount(2))
      .subscribe(val => {
        expect(val).toEqual([{id: 1, data: 'some1'}, {id: 2, data: 'some2'}]);
      });

      service.postData(CRUDRouter.entitySequence, {sequenceId: 1}, {value: 'some'}).subscribe(val => {
        expect(val).toEqual({id: 2, data: 'some2'});
      });

      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        anything())
      ).once();

      verify(mockedApi.postData(
        anything(),
        anything(),
        anything(),
        anything()
      )).once();
    }));

    it('should update store item when patching', inject([DataService],  (service) => {
      let reqGet = false;
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).pipe(bufferCount(2)).subscribe(([initial, val]) => {
        expect(val).toEqual({id: 1, data: 1});
        expect(initial).toEqual({id: 1, data: 'some1'});
        reqGet = true;
      });

      let reqPatch = false;
      service.patchData(CRUDRouter.entitySequence, {sequenceId: 1}, [{op: 'replace', value: 'some', path: '/some'}]).subscribe(val => {
        expect(val).toEqual({id: 1, data: 1});
        reqPatch = true;
      });

      expect(reqGet).toBeTruthy();
      expect(reqPatch).toBeTruthy();

      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        anything())
      ).once();

      verify(mockedApi.patchData(
        anything(),
        anything(),
        anything(),
        anything()
      )).once();
    }));

    it('should throw error when patching with 0 operations', inject([DataService], (service: DataService) => {
      service.patchData(CRUDRouter.entitySequence, {sequenceId: 1}, []).subscribe(() => {}, err => expect(err).toBeTruthy());
    }));

    it('should try re-fetching store item which was deleted', inject([DataService], (service: DataService) => {
      const reqs = service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).pipe(mergeMap(initialData => {
        verify(mockedApi.getData(
          deepEqual(CRUDRouter.entitySequence),
          deepEqual({sequenceId: 1}),
          anything())
        ).once();
        expect(initialData).toEqual({id: 1, data: 'some1'});
        return service.deleteData(CRUDRouter.entitySequence, {sequenceId: 1});
      }),
        mergeMap(deletedData => {
          expect(deletedData).toEqual({id: 1, data: 'some1'});
          return service.getData(CRUDRouter.entitySequence, {sequenceId: 1});
        })
      );
      const spy = createSpy('reqssubscribe');
      reqs.subscribe(spy);


      expect(spy).toHaveBeenCalledWith({id: 1, data: 'some1'});
      verify(mockedApi.getData(
        deepEqual(CRUDRouter.entitySequence),
        deepEqual({sequenceId: 1}),
        anything())
      ).twice();
    }));

    it('should recover store item when recovering', inject([DataService],  (service: DataService) => {
      service.getData(CRUDRouter.entitySequence, {sequenceId: 1}).pipe(mergeMap(initialData => {
          expect(initialData).toBeTruthy();
          return service.deleteData(CRUDRouter.entitySequence, {sequenceId: 1});
        })
      ).subscribe(deletedData => {
        expect(deletedData).toBeTruthy();
      });

      service.restoreData(CRUDRouter.entitySequence, {sequenceId: 1}).subscribe((d) => {
        expect(d).toEqual({id: 2, data: 'some2'});
      });

      verify(mockedApi.postData(CRUDRouter.entitySequence, anything(), deepEqual({id: 1, data: 'some1'}), anything())).once();
    }));
  });

});
