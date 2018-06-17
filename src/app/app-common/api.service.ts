import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Operation } from 'fast-json-patch';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';



export interface ApiRoute {
  path: string,
  params: string[]
}

export interface RouteParams {
  [paramName: string]: string | number
}

export enum CRUD {
  CREATE,
  READ,
  UPDATE,
  DELETE
}

@Injectable()
export class ApiService {

  private apiEndpoint: string;
  constructor(
    private http: HttpClient,
    cs: CookieService
  ) {
    this.apiEndpoint = environment.api ? `${environment.api}` : cs.get('API-URL');

    if (!this.apiEndpoint) {
      throw Error('Illegal api');
    }
  }

  private errorHandler(triggeredBy) {
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
      console.error(error);

      return throwError(errMsg);
    };
  }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.get<T>(`${this.apiEndpoint}${url}`, {
      params: queryParams,
    }).pipe(catchError(this.errorHandler(route.path)))
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.post<T>(`${this.apiEndpoint}${url}`, body, {
      params: queryParams,
    }).pipe(catchError(this.errorHandler(route.path)))
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.patch<T>(`${this.apiEndpoint}${url}`, operations, {
      params: queryParams,
    }).pipe(catchError(this.errorHandler(route.path)))
  }

  deleteData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.delete<T>(`${this.apiEndpoint}${url}`, {
      params: queryParams,
    }).pipe(catchError(this.errorHandler(route.path)))
  }

}

function setUrlParams(path: string, params: RouteParams) {
  for (const param in params) {
    path = path.replace(`:${param}`, `${params[param] || 0}`);
  }
  return path;
}

function setQueryParams (query) {
  const queryParams = new HttpParams();
  for (const p in query) {
    queryParams.append(p, `${query[p]}`)
  }

  return queryParams;
}
