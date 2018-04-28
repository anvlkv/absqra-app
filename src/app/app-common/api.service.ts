import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Operation } from 'fast-json-patch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

export interface ApiRoute {
  path: string,
  params: string[]
}

export interface RouteParams {
  [paramName: string]: string
}

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = new HttpParams();
    for (const p in query) {
      queryParams.append(p, query[p])
    }

    return this.http.get(`${environment.apiEndpoint}${url}`, {
      params: queryParams,
    }).catch(this.handleError(route.path))
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = new HttpParams();
    for (const p in query) {
      queryParams.append(p, query[p])
    }
    return this.http.post(`${environment.apiEndpoint}${url}`, body, {
      params: queryParams,
    }).catch(this.handleError(route.path))
  }

  patchData<T>(route: ApiRoute, params?: RouteParams, operations?: Operation[], query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = new HttpParams();
    for (const p in query) {
      queryParams.append(p, query[p])
    }
    return this.http.patch(`${environment.apiEndpoint}${url}`, operations, {
      params: queryParams,
    }).catch(this.handleError(route.path))
  }

  deleteData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = new HttpParams();
    for (const p in query) {
      queryParams.append(p, query[p])
    }
    return this.http.delete(`${environment.apiEndpoint}${url}`, {
      params: queryParams,
    }).catch(this.handleError(route.path))
  }

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

}

function setUrlParams(path: string, params: {[param: string]: string}) {
  for (const param in params) {
    if (params[param]) {
      path = path.replace(`:${param}`, params[param]);
    }
    else {
      throw Error(`Param ${param} is required for route ${path}`)
    }
  }
  return path;
}
