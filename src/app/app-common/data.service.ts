import { Injectable } from '@angular/core';
import { ApiRoute, ApiService, RouteParams } from './api.service';
import { Observable ,  Subject ,  concat } from 'rxjs';
import { Operation } from 'fast-json-patch';
import { PublicMembersInterface } from '../../models/public-members.interface';
import * as objectHash from 'object-hash';
import { errorHandler } from '../utils';


interface RequestParams {
  route: ApiRoute;
  params?: RouteParams;
  query?: RouteParams;
}

interface DataStoreItem {
  $dataItem: Subject<any>;
  requestParams: RequestParams;
}

export type ReFetchQuery = string | {params: RouteParams, query: RouteParams} | RouteParams;

@Injectable()
export class DataService implements PublicMembersInterface<ApiService> {

  private dataStore: {
    [dataItemIdentifier: string]: DataStoreItem
  } = {};

  constructor(
    private api: ApiService,
  ) { }

  private getIdentifier(route: ApiRoute, params: RouteParams = {}, query: RouteParams = {}): string {
    return `${route.path}_${objectHash(params, {replacer: hashReplacePolicy})}_${objectHash(query, {replacer: hashReplacePolicy})}`;
  }

  private getFromStore<T>(identifier: string, {...requestParams}: RequestParams, doNotCreate = false): Subject<T> {
    let $dataItem: Subject<T>;
    try {
      $dataItem = this.dataStore[identifier].$dataItem;
    } catch (e) {
      if (doNotCreate) {
        return null;
      }

      $dataItem = new Subject<T>();
      this.dataStore[identifier] = {
        $dataItem,
        requestParams,
      };
    }

    return $dataItem
  }

  private findRelatedStoreItems (query: string): DataStoreItem[] {
    const storeItemsIds = Object.keys(this.dataStore);

    const matchingItems = storeItemsIds.filter((fullId) => {
      return fullId.includes(query);
    }).map((fullId) => {
      return this.dataStore[fullId];
    });

    return matchingItems;

  }

  private reFetch(refetch: ReFetchQuery): Observable<any>[] {
    let storeItems: DataStoreItem[] = [];
    if (typeof refetch == 'string') {
      storeItems = this.findRelatedStoreItems(refetch);
    }
    else if (typeof refetch == 'object' && refetch.hasOwnProperty('params') && refetch.hasOwnProperty('query')) {
      storeItems = this.findRelatedStoreItems(`_${objectHash(refetch['params'], {replacer: hashReplacePolicy})}_${objectHash(refetch['query'], {replacer: hashReplacePolicy})}`);
    }
    else if (typeof refetch == 'object') {
      storeItems = this.findRelatedStoreItems(`_${objectHash(refetch, {replacer: hashReplacePolicy})}`);
    }
    else {
      return this.reFetch(String(refetch));
    }

    return storeItems.map(item => {
      return this.getData(item.requestParams.route, item.requestParams.params, item.requestParams.query);
    });
  }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const request = this.api.getData<T>(route, params, query);
    const identifier = this.getIdentifier(route, params, query);

    // return
    let storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);

    if (!storeSubject) {
      storeSubject = this.getFromStore<T>(identifier, {route, params, query});
    }

    request.subscribe((d) => {
      storeSubject.next(d);
    }, e => storeSubject.error(e));


    return storeSubject.asObservable();
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const request = this.api.postData<T>(route, params, body, query);
    // const refetchRequests = concat(refetch.map(r => this.reFetch(r)));
    const identifier = this.getIdentifier(route, params, query);

    const storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);

    if (storeSubject) {
      request.subscribe(d => storeSubject.next(d), e => storeSubject.error(e));
    }

    return storeSubject ? storeSubject.asObservable() : request;
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    const request = this.api.patchData<T>(route, params, operations, query);
    // const refetchRequests = concat(refetch.map(r => this.reFetch(r)));
    const identifier = this.getIdentifier(route, params, query);

    const storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);

    if (storeSubject) {
      request.subscribe(d => storeSubject.next(d), e => storeSubject.error(e));
    }

    return storeSubject ? storeSubject.asObservable() : request;
  }

  deleteData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    const request = this.api.deleteData<T>(route, params, query);
    // request.toPromise().then(r => {
    //   const refetchRequests = concat(refetch.map(ref => this.reFetch(ref)));
    // });
    const identifier = this.getIdentifier(route, params, query);

    const storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);

    if (storeSubject) {
      request.subscribe(d => {
        storeSubject.next(d);
        storeSubject.complete();
      }, e => storeSubject.error(e));
    }

    return storeSubject ? storeSubject.asObservable() : request;
  }

}

function hashReplacePolicy(value: any): object | string {
  if (typeof value == 'object') {
    return value;
  }
  else if (value) {
    return value.toString();
  }
  else {
    return '';
  }
}
