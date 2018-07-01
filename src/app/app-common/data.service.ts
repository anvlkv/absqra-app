import { Injectable } from '@angular/core';
import { ApiRoute, ApiService, RouteParams } from './api.service';
import { Observable, Subject, concat, of, noop } from 'rxjs';
import { Operation } from 'fast-json-patch';
import { PublicMembersInterface } from '../../models/public-members.interface';
import * as objectHash from 'object-hash';
import { errorHandler } from '../utils';
import { map } from 'rxjs/operators';


interface RequestParams {
  route: ApiRoute;
  params?: RouteParams;
  query?: RouteParams;
}

class DataStoreItem {
  dataItem?: any;
  requestParams: RequestParams;
  inFlight: Observable<any>;

  constructor(
    readonly id: string,
    requestParams: RequestParams
  ) {
    this.id = id;
    this.requestParams = requestParams;
  }

  // public asObservable() {
  // }
}

export type ReFetchQuery = string | {params: RouteParams, query: RouteParams} | RouteParams;

@Injectable()
export class DataService implements PublicMembersInterface<ApiService> {

  private dataStore: {
    [dataItemIdentifier: string]: DataStoreItem
  } = {};

  private getIdentifier(route: ApiRoute, params: RouteParams = {}, query: RouteParams = {}): string {
    return `${route.path}_${objectHash(params, {replacer: hashReplacePolicy})}_${objectHash(query, {replacer: hashReplacePolicy})}`;
  }

  constructor(
    private api: ApiService,
  ) { }


  // private getFromStore<T>(identifier: string, {...requestParams}: RequestParams): Subject<T> {
  //   let $dataItem: Subject<T>;
  //   try {
  //     $dataItem = this.dataStore[identifier].$dataItem;
  //   } catch (e) {
  //     if (doNotCreate) {
  //       return null;
  //     }
  //
  //     $dataItem = new Subject<T>();
  //     this.dataStore[identifier] = {
  //       $dataItem,
  //       requestParams,
  //     };
  //   }
  //
  //   return $dataItem
  // }
  //
  // private findRelatedStoreItems (query: string): DataStoreItem[] {
  //   const storeItemsIds = Object.keys(this.dataStore);
  //
  //   const matchingItems = storeItemsIds.filter((fullId) => {
  //     return fullId.includes(query);
  //   }).map((fullId) => {
  //     return this.dataStore[fullId];
  //   });
  //
  //   return matchingItems;
  //
  // }
  //
  // private reFetch(refetch: ReFetchQuery): Observable<any>[] {
  //   let storeItems: DataStoreItem[] = [];
  //   if (typeof refetch == 'string') {
  //     storeItems = this.findRelatedStoreItems(refetch);
  //   }
  //   else if (typeof refetch == 'object' && refetch.hasOwnProperty('params') && refetch.hasOwnProperty('query')) {
  //     storeItems = this.findRelatedStoreItems(`_${objectHash(refetch['params'], {replacer: hashReplacePolicy})}_${objectHash(refetch['query'], {replacer: hashReplacePolicy})}`);
  //   }
  //   else if (typeof refetch == 'object') {
  //     storeItems = this.findRelatedStoreItems(`_${objectHash(refetch, {replacer: hashReplacePolicy})}`);
  //   }
  //   else {
  //     return this.reFetch(String(refetch));
  //   }
  //
  //   return storeItems.map(item => {
  //     return this.getData(item.requestParams.route, item.requestParams.params, item.requestParams.query);
  //   });
  // }

  // private storeItemUpdater(identifier: string) {
  //   return (dataItem) => {
  //     this.dataStore[identifier].dataItem = dataItem;
  //     delete this.dataStore[identifier].inFlight;
  //     return dataItem;
  //   }
  // }

  // private storeItemDeleter(identifier: string) {
  //
  // }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const identifier = this.getIdentifier(route, params, query);

    let storeItem = this.dataStore[identifier];

    if (!storeItem) {
      storeItem = new DataStoreItem(identifier, {route, query, params});
    }

    if (!storeItem.dataItem && !storeItem.inFlight) {
      storeItem.inFlight = this.api.getData<T>(route, params, query).pipe(
        map((data) => {
          storeItem.dataItem = data;
          return data;
        })
      );
    }

    return this.api.getData<T>(route, params, query);

    // if ()

    // return storeItem.inFlight ||

    // if (this.dataStore[identifier]) {
    //   if (this.dataStore[identifier].inFlight) {
    //     this.dataStore[identifier].inFlight.pipe(
    //       observer.next,
    //       this.storeItemUpdater(identifier)
    //     )
    //   }
    //   else {
    //     observer.next(this.dataStore[identifier].dataItem)
    //   }
    // }
    // else {
    //    = {
    //     inFlight: this.api.getData<T>(route, params, query).pipe(
    //       observer.next,
    //       this.storeItemUpdater(identifier)
    //     ),
    //     requestParams: {route, params, query}
    //   };
    // }
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const request = this.api.postData<T>(route, params, body, query);
    // const refetchRequests = concat(refetch.map(r => this.reFetch(r)));
    // const identifier = this.getIdentifier(route, params, query);
    //
    // const storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);
    //
    // if (storeSubject) {
    //   request.subscribe(d => storeSubject.next(d), e => storeSubject.error(e));
    // }

    return request;
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    const request = this.api.patchData<T>(route, params, operations, query);
    // const refetchRequests = concat(refetch.map(r => this.reFetch(r)));
    // const identifier = this.getIdentifier(route, params, query);
    //
    // const storeSubject = this.getFromStore<T>(identifier, {route, params, query}, true);
    //
    // if (storeSubject) {
    //   request.subscribe(d => storeSubject.next(d), e => storeSubject.error(e));
    // }

    return request;
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
