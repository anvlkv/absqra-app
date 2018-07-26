import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Operation } from 'fast-json-patch';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { errorHandler } from '../utils';
import { ApiRoute } from 'api';

export interface RouteParams {
  [paramName: string]: string | number
}

export enum CRUD {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
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

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.get<T>(`${this.apiEndpoint}${url}`, {
      params: queryParams,
    }).pipe(catchError(errorHandler(route.path)))
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.post<T>(`${this.apiEndpoint}${url}`, body, {
      params: queryParams,
    }).pipe(catchError(errorHandler(route.path)))
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.patch<T>(`${this.apiEndpoint}${url}`, operations, {
      params: queryParams,
    }).pipe(catchError(errorHandler(route.path)))
  }

  deleteData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    const url = setUrlParams(route.path, params);
    const queryParams = setQueryParams(query);

    return <Observable<T>>this.http.delete<T>(`${this.apiEndpoint}${url}`, {
      params: queryParams,
    }).pipe(catchError(errorHandler(route.path)))
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
