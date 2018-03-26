import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

import { Deferred, defer } from 'q';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

export interface RoutingMetaData {
  [routeGroupName: string]: {
    [routeName: string]: {
      path: string;
      params: string;
    }
  };
}

export interface TypesMetaData {
  [enumName: string]: string[];
}

export interface StoreSubject {
  id: number;
  $subject: Subject<any>;
}

@Injectable()
export class GeneralDataService {
  // private interviewerRoutes:= {};

  public apiRoutes: RoutingMetaData = {};

  public apiTypes: TypesMetaData = {};

  public ready: Q.Promise<any>;

  private store: {
    [group: string]: {
      [route: string]: Array<StoreSubject>;
    };
  } = {};

  private readyDef: Deferred<any> = defer();

  constructor (
    private http: HttpClient
  ) {
    this.ready = this.readyDef.promise;
    this.initApi();
  }


  initApi() {
    Observable.forkJoin([
      this.http.get(environment.apiMeta + '/routes'),
      this.http.get(environment.apiMeta + '/types')
    ]).subscribe(([knownRoutes, apiTypes]) => {
      // knownRoutes = knownRoutes.json();
      for (const routeGroupName in knownRoutes) {
        this.apiRoutes[routeGroupName] = {};
        this.store[routeGroupName] = {};
        knownRoutes[routeGroupName].forEach(({name, path, params}: {[prop: string]: string}) => {
          if (!name) {
            return;
          }

          this.apiRoutes[routeGroupName][name] = {
            path: environment.apiEndpoint + path,
            params
          };

          this.store[routeGroupName][name] = [];
        });
      }

      this.apiTypes = <TypesMetaData>apiTypes;

      this.readyDef.resolve(true);
    });

    return this.ready;
  }

  getData(group, route, params?): Observable<any> {
    const path = this.setUrlParams(this.apiRoutes[group][route].path, params);

    const key = dataToHasId(params);
    let storeSubject = this.store[group][route].find(subj => subj.id === key);

    if (!storeSubject) {
      storeSubject = {id: key, $subject: new Subject<any>()};
      this.store[group][route].push(storeSubject);
    }



    this.http.get(path, {withCredentials: true})
      .catch(this.handleError(`${group}.${route}`))
      .subscribe(data => {
        storeSubject.$subject.next(data);
      });

    return storeSubject.$subject.asObservable();
  }

  postData(group, route, params, data): Observable<any> {
    const path = this.setUrlParams(this.apiRoutes[group][route].path, params);

    return this.http.post(path, data, {withCredentials: true})
    .catch(this.handleError(`${group}.${route}`));
  }

  patchData(group, route, params, data): Observable<any> {
    const path = this.setUrlParams(this.apiRoutes[group][route].path, params);

    return this.http.patch(path, data, {withCredentials: true})
    .catch(this.handleError(`${group}.${route}`));
  }

  deleteData(group, route, params): Observable<any> {
    const path = this.setUrlParams(this.apiRoutes[group][route].path, params);

    return this.http.delete(path, {withCredentials: true})
    .catch(this.handleError(`${group}.${route}`));
  }

  // extractData(res: Response) {
  //   const body = res.json();
  //   return body || {};
  // }

  handleError(triggeredBy) {
    return function (error: Response | any, ) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      try {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } catch (e) {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(`API err at: ${triggeredBy}`);
      console.error(errMsg);
      return Observable.throw(errMsg);
    };
  }

  nestUrlParts(...parts): string {
    parts = parts.filter(p => !!p);

    return parts.join('/');
  }

  setUrlParams(path: string, params: {[param: string]: string}) {
    for (const param in params) {
      path = path.replace(`:${param}`, params[param]);
    }
    return path;
  }
}

function dataToHasId(data?: any) {
  try {
    data = JSON.stringify(data) || String(data);
  } catch (e) {
    data = String(data);
  }

  return data.hashCode();
}
