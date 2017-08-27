import { Injectable } from '@angular/core';
import {Sequence} from './sequence';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MockDataService {
  private mockServer = 'http://localhost:3000';
  private sequencesUrl = this.mockServer + '/sequences';

  constructor(private http: Http) { }

  getSequences(): Observable<Sequence[]> {
    return this.http.get(this.sequencesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postSequence(sequence) {
    return this.http.post(this.sequencesUrl, sequence)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSequence(id){
    return this.http.get(this.nestUrl(this.sequencesUrl, id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private nestUrl(...parts){
    let url = '';

    parts.forEach(part => {
      url += '/' + part;
    });

    return url;
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
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
}
