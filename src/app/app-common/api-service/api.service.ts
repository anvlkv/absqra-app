import { catchError, map, takeWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Operation } from 'fast-json-patch';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { errorHandler } from '../../utils';
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

  private apiUrl: string;
  private callLog: {
    [METHOD_endpoint: string]: Date[]
  } = {};
  private allowedInterval = 1000;

  constructor(
    private http: HttpClient,
    cs: CookieService
  ) {
    this.apiUrl = environment.api ? `${environment.api}` : cs.get('API-URL');

    if (!this.apiUrl) {
      throw Error('Illegal api');
    }
  }

  private audit(method: string, url: string) {
    const logKey = `${method.toUpperCase()}_${url}`;
    this.callLog[logKey] = this.callLog[logKey] || [];
    const logEntry = this.callLog[logKey];

    logEntry.push(new Date());

    if (logEntry.length > 1) {
      if (this.allowedInterval > logEntry[logEntry.length - 1].valueOf() - logEntry[logEntry.length - 2].valueOf()) {
        console.warn(`calling [${logKey}] more often than every [${this.allowedInterval}ms] is not allowed`);
        return false;
      }
    }

    return true;
  }

  getData<T>(route: ApiRoute, params?: RouteParams, query?: RouteParams): Observable<T> {
    const url = `${this.apiUrl}${setUrlParams(route.path, params)}`;
    const queryParams = setQueryParams(query);
    return <Observable<T>>this.http.get<T>(url, {
      params: queryParams,
    }).pipe(
      takeWhile(() => this.audit('GET', url)),
      map(this.transform.bind(this)),
      catchError(errorHandler(route.path))
    )
  }

  postData<T>(route: ApiRoute, params?: RouteParams, body?: any, query?: RouteParams): Observable<T> {
    const url = `${this.apiUrl}${setUrlParams(route.path, params)}`;
    const queryParams = setQueryParams(query);
    return <Observable<T>>this.http.post<T>(url, body, {
      params: queryParams,
    }).pipe(
      takeWhile(() => this.audit('POST', url)),
      map(this.transform.bind(this)),
      catchError(errorHandler(route.path))
    )
  }

  patchData<T>(route: ApiRoute, params: RouteParams, operations: Operation[], query?: RouteParams): Observable<T> {
    const url = `${this.apiUrl}${setUrlParams(route.path, params)}`;
    const queryParams = setQueryParams(query);
    return <Observable<T>>this.http.patch<T>(url, operations, {
      params: queryParams,
    }).pipe(
      takeWhile(() => this.audit('PATCH', url)),
      map(this.transform.bind(this)),
      catchError(errorHandler(route.path))
    )
  }

  deleteData<T>(route: ApiRoute, params: RouteParams, query?: RouteParams): Observable<T> {
    const url = `${this.apiUrl}${setUrlParams(route.path, params)}`;
    const queryParams = setQueryParams(query);
    return <Observable<T>>this.http.delete<T>(url, {
      params: queryParams,
    }).pipe(
      takeWhile(() => this.audit('DELETE', url)),
      map(this.transform.bind(this)),
      catchError(errorHandler(route.path))
    )
  }

  private transform(data) {
    switch (typeof data) {
      case 'object': {
        for (const prop in data) {
          data[prop] = this.transform(data[prop]);
        }
        return data;
      }
      case 'string': {

        const [isInt, isFloat, isIsoDate] = [
          /^\d+$/,
          /^[+-]?([0-9]*[.,])[0-9]+$/,
          /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
        ].map(reg => reg.test(data));

        if ([isInt, isFloat, isIsoDate].filter(is => is).length > 1) {
          throw new Error(`cannot parse data [${data}], matches [${isInt ? 'Int' : ''} ${isFloat ? 'Float' : ''} ${isIsoDate ? 'ISO date' : ''}]`)
        }
        else if (isInt) {
          return parseInt(data, 10);
        }
        else if (isFloat) {
          return parseFloat(data);
        }
        else if (isIsoDate) {
          return new Date(data);
        }
        else {
          return data;
        }
      }
      default: {
        return data;
      }
    }
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
    if (query.hasOwnProperty(p)) {
      queryParams.append(p, `${query[p]}`)
    }
  }

  return queryParams;
}
