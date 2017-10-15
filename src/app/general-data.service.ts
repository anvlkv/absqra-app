import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Sequence } from '../models/sequence';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Deferred, defer } from 'q';

@Injectable()
export class GeneralDataService {
  // private interviewerRoutes:= {};

  public apiRoutes:{
    [routeGroupName:string]:{
      [routeName: string]:{
        path:string;
        params: string;
      }
    }
  }={};

  public ready: Q.Promise<any>;

  constructor (
    private http: Http
  ) {
    const readyDef: Deferred<any> = defer();

    this.http.get(environment.apiMeta + '/routes').subscribe(r=>{
      const knownRoutes = r.json();
      for (let routeGroupName in knownRoutes){
        this.apiRoutes[routeGroupName] = {};
        knownRoutes[routeGroupName].forEach(({name, path, params}:{[prop:string]:string}) =>{
          if(!name){
            return
          }

          this.apiRoutes[routeGroupName][name] = {
            path: environment.apiEndpoint + path,
            params
          };

        })
      }

      readyDef.resolve(true);

    });
    this.ready = readyDef.promise;
  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  nestUrlParts(...parts): string {
    parts = parts.filter(p => !!p);

    return parts.join('/');
  }

  setUrlParams(path: string, params:{[param:string]:string}){
    let resultingPath: string;
    for (let param in params){
      resultingPath = path.replace(`:${param}`, params[param])
    }
    return resultingPath;
  }
}
