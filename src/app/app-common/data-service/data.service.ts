import { Injectable } from '@angular/core';
import { ApiService, RouteParams } from '../api-service/api.service';
import { Observable, of, throwError } from 'rxjs';
import { Operation } from 'fast-json-patch';
import { PublicMembersInterface } from 'models/public-members.interface';
import { ApiRoute } from 'api';
import { DataStore } from './data-store';
import { combineAll, flatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


export type ReFetchQuery = string | {params: RouteParams, query: RouteParams} | RouteParams;

@Injectable()
export class DataService implements PublicMembersInterface<ApiService> {
  private dataStore = new DataStore();

  constructor(
    private api: ApiService,
  ) { }

  download(route: ApiRoute, params: RouteParams, query?: RouteParams) { return this.api.download(route, params, query) }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    try {
      const itemId = getItemIdFromParams(params, route.typeName);
      if (itemId && this.dataStore.checkIsInStore(route.typeName, itemId)) {
        return this.dataStore.getItem(route.typeName, itemId).subject$.asObservable();
      }
      else if (itemId /* assuming single entity is requested */) {
        const id = this.dataStore.addItem(route.typeName, {id: itemId}, true);
        const storeItem = this.dataStore.getByStoreId(id);
        storeItem.inFlight = this.api.getData<T>(route, params, query);
        return storeItem.inFlight;
      }
      else /* assuming multiple entities are requested */ {
        return this.api.getData<T[]>(route, params, query).pipe<T>(
          switchMap((coll) => {
            return coll.length !== 0 ?
              of(coll).pipe(
                map(d => {
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
              ) :
              of(<any>[]);
          })
        );
      }
    } catch (e) {
      if (!environment.production) {
        console.error(e);
      }
      return throwError(e);
    }
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    try {
      const itemId = getItemIdFromParams(params, route.typeName);
      if (itemId && this.dataStore.checkIsInStore(route.typeName, itemId)) {
        const storeItem = this.dataStore.getItem(route.typeName, itemId);
        storeItem.inFlight = this.api.postData<T>(route, params, body, query);
        return storeItem.inFlight
      }
      else if (itemId) {
        return this.api.postData<T>(route, params, body, query).pipe(mergeMap(d => {
          const storeId = this.dataStore.addItem(route.typeName, d);
          return this.dataStore.getByStoreId(storeId).subject$.asObservable();
        }));
      }
      else {
        const storeId = this.dataStore.addItem(route.typeName, body, true);
        const storeItem = this.dataStore.getByStoreId(storeId);

        storeItem.inFlight = this.api.postData<T>(route, params, body, query);
        return storeItem.inFlight.pipe(tap(data => {
          storeItem.permanentId = data.id;
        }));
      }
    } catch (e) {
      if (!environment.production) {
        console.error(e);
      }
      return throwError(e);
    }
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    try {
      if (!operations.length) {
        throw new Error(`calling PATCH [${route.path}] with [0] operations`);
      }
      const itemId = getItemIdFromParams(params, route.typeName);
      const storeItem = this.dataStore.getItem(route.typeName, itemId);
      storeItem.inFlight = this.api.patchData<T>(route, params, operations, query);
      return storeItem.inFlight;
    } catch (e) {
      if (!environment.production) {
        console.error(e);
      }
      return throwError(e);
    }
  }

  deleteData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    try {
      const itemId = getItemIdFromParams(params, route.typeName);
      const deleteRequest = this.api.deleteData<T>(route, params, query);
      let storeItem;
      if (this.dataStore.checkIsInStore(route.typeName, itemId)) {
        storeItem = this.dataStore.getItem(route.typeName, itemId);
        storeItem.inFlight = deleteRequest;
        this.dataStore.safeDelete(route.typeName, itemId);
      }
      return deleteRequest;
    } catch (e) {
      if (!environment.production) {
        console.error(e);
      }
      return throwError(e);
    }
  }

  restoreData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    try {
      const itemId = getItemIdFromParams(params, route.typeName);
      if (this.dataStore.checkIsInStore(route.typeName, itemId, true)) {
        const storeItem = this.dataStore.restoreItem(route.typeName, itemId);
        return storeItem.subject$.pipe(
          mergeMap(restoredData => {
            return this.api.postData<T>(route, params, restoredData, query);
          })
        )
      }
    } catch (e) {
      if (!environment.production) {
        console.error(e);
      }
      return throwError(e);
    }
  }

}


function getItemIdFromParams(params, typeName) {
  return params && params.hasOwnProperty(`${typeName}Id`) ? `${params[`${typeName}Id`]}` : null;
}
