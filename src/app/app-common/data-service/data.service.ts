import { Injectable } from '@angular/core';
import { ApiService, RouteParams } from '../api.service';
import { combineLatest, merge, Observable, of, pipe } from 'rxjs';
import { Operation } from 'fast-json-patch';
import { PublicMembersInterface } from '../../../models/public-members.interface';
import { ApiRoute } from 'api';
import { DataStore } from './data-store';
import { combineAll, flatMap, map, mergeAll, mergeMap, tap } from 'rxjs/operators';
import { flatten } from '@angular/compiler';
import { fromArray } from 'rxjs/internal/observable/fromArray';



export type ReFetchQuery = string | {params: RouteParams, query: RouteParams} | RouteParams;

@Injectable()
export class DataService implements PublicMembersInterface<ApiService> {

  private dataStore = new DataStore();

  constructor(
    private api: ApiService,
  ) { }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const itemId = getItemIdFromParams(params, route.typeName);
    if (itemId && this.dataStore.checkIsInStore(route.typeName, itemId)) {
      return this.dataStore.getItem(route.typeName, itemId).subject$.asObservable();
    }
    else if (itemId /* assuming single entity is requested */) {
      return this.api.getData<T>(route, params, query).pipe( mergeMap(d => {
        const id = this.dataStore.addItem(route.typeName, d);
        return this.dataStore.getByStoreId(id).subject$.asObservable();
      }));
    }
    else /* assuming multiple entities are requested */ {
      return <any> this.api.getData<T[]>(route, params, query).pipe(map(d => {
        let storeIds: string[];
        if (d instanceof Array) {
          storeIds = d.map(data => {
            return this.dataStore.addItem(route.typeName, data);
          });
        }
        else {
          storeIds = [this.dataStore.addItem(route.typeName, d)];
        }
        return storeIds;
      }),
        flatMap((ids) => {
          return ids.map(id => this.dataStore.getByStoreId(id).subject$.asObservable());
        }),
        combineAll()
      );
    }
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const itemId = getItemIdFromParams(params, route.typeName);
    if (itemId && this.dataStore.checkIsInStore(route.typeName, itemId)) {
      const storeItem = this.dataStore.getItem(route.typeName, itemId);
      storeItem.inFlight = this.api.postData<T>(route, params, body, query);
      return storeItem.inFlight.pipe(
        mergeMap(data => {
          storeItem.subject$.next(data);
          return storeItem.subject$.asObservable();
        })
      );
    }
    else if (itemId) {
      return this.api.postData<T>(route, params, body, query).pipe( mergeMap(d => {
        const storeId = this.dataStore.addItem(route.typeName, d);
        return this.dataStore.getByStoreId(storeId).subject$.asObservable();
      }));
    }
    else {
      const storeId = this.dataStore.addItem(route.typeName, body);
      const storeItem = this.dataStore.getByStoreId(storeId);

      storeItem.inFlight = this.api.postData<T>(route, params, body, query);
      return storeItem.inFlight.pipe(
        mergeMap(data => {
          storeItem.permanentId = data.id;
          storeItem.subject$.next(data);
          return storeItem.subject$.asObservable();
        })
      );
    }
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    const itemId = getItemIdFromParams(params, route.typeName);
    const storeItem = this.dataStore.getItem(route.typeName, itemId);
    storeItem.inFlight = this.api.patchData<T>(route, params, operations, query);
    return storeItem.inFlight.pipe(
      mergeMap(data => {
        storeItem.subject$.next(data);
        return storeItem.subject$.asObservable();
      })
    );
  }

  deleteData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    const request = this.api.deleteData<T>(route, params, query);
    // request.toPromise().then(r => {
    //   const refetchRequests = concat(refetch.map(ref => this.reFetch(ref)));
    // });
    // const identifier = this.getIdentifier(route, params, query);
    //
    // const storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);
    //
    // if (storeSubject) {
    //   request.subscribe(d => {
    //     storeSubject.next(d);
    //     storeSubject.complete();
    //   }, e => storeSubject.error(e));
    // }

    return request;
  }

}


function getItemIdFromParams(params, typeName) {
  return params && params.hasOwnProperty(`${typeName}Id`) ? `${params[`${typeName}Id`]}` : null;
}
