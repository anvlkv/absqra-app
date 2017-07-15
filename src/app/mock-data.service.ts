import { Injectable } from '@angular/core';
import {Sequence} from './sequence';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';


import {Item} from "./item";

@Injectable()
export class MockDataService {
  private mockServer = 'http://localhost:3000';
  private sequencesUrl = this.mockServer + '/sequences';
  private itemsUrl = this.mockServer + '/items';


  constructor(private http: Http) { }

  getSequences(): Observable<Sequence[]> {
    return this.http.get(this.sequencesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSequence(id): Observable<Sequence> {
    return this.http.get(this.nestUrlParts(this.sequencesUrl, id))
      .map(this.extractData)
      .catch(this.handleError)
  }

  getSequenceItems(id): Observable<Item[]> {
    return this.http.get(this.nestUrlParts(this.sequencesUrl, id, 'items'))
      .map(this.extractData)
      .catch(this.handleError)
  }

  postSequence(sequence): Observable<Sequence> {
    return this.http.post(this.sequencesUrl, sequence)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postItem(item): Observable<Item> {
    return this.http.post(this.itemsUrl, item)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateItem(item): Observable<Item> {
    return this.http.patch(this.nestUrlParts(this.itemsUrl, item.id), item)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateSequence(sequenceId, patch): Observable<Sequence>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers});

    return this.http.patch(this.nestUrlParts(this.sequencesUrl, sequenceId), patch, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addItemToSequence(item: Item | {}, sequenceId: string): Observable<{Sequence: Sequence, itemId:string}>{
    const obsSequence: Subject<{Sequence: Sequence, itemId:string}> = new Subject();

    this.getSequence(sequenceId).subscribe(originalSequence=>{
      this.postItem(item)
        .subscribe(newItem=>{
          const itemsIds = originalSequence.itemsIds || [];

          itemsIds.push(newItem.id);

          this.updateSequence(sequenceId, {itemsIds}).subscribe(seq=>{
            obsSequence.next({Sequence: seq, itemId: newItem.id});
          })
        })
    });

    return obsSequence;
  }

  getItem(id) : Observable<Item>{
    return this.http.get(this.nestUrlParts(this.itemsUrl, id))
      .map(this.extractData)
      .catch(this.handleError)
  }

  private nestUrlParts(...parts): string{
    return parts.join('/');
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
