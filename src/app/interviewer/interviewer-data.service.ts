import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GeneralDataService } from '../general-data.service';
import { Observable } from 'rxjs/Observable';
import { Sequence } from '../../models/sequence';
import { Item } from '../../models/item';
import * as rfc6902 from 'rfc6902';

@Injectable()
export class InterviewerDataService{

  constructor(
    private http: Http,
    private generalData: GeneralDataService
  ) {
  }

  public apiReady(){
    return this.generalData.ready
  }

  addSequence(data: { name: string }) {
    return this.http.post(this.generalData.apiRoutes['interviewerRoutes']['addSequence'].path, data)
    .map(this.generalData.extractData)
    .catch(this.generalData.handleError);
  }

  getSequences(): Observable<Sequence[]>{
    return this.http.get(this.generalData.apiRoutes['interviewerRoutes']['getSequences'].path)
    .map(this.generalData.extractData)
    .catch(this.generalData.handleError)
  }

  getSequence(sequenceId):Observable<Sequence>{
    return this.http.get(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['getSequence'].path,
        {sequenceId})
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }

  addNewItemToSequence(sequenceId, item): Observable<Sequence>{
    return this.http.post(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['addNewItemToSequence'].path,
        {sequenceId}
      ),
      item
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }

  deleteItem(itemId): Observable<Item>{
    return this.http.delete(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['deleteItem'].path,
        {itemId}
      )
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }

  removeItem(sequenceId, itemId): Observable<Sequence>{
    return this.http.delete(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['removeItem'].path,
        {sequenceId, itemId}
      )
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }

  getItem(itemId): Observable<Item>{
    return this.http.get(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['getItem'].path,
        {itemId}
      )
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }

  updateItem(oldItem, newItem): Observable<Item>{
    return this.http.patch(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['updateItem'].path,
        {itemId: oldItem._id}
      ),
      rfc6902.createPatch(oldItem, newItem)
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }

  updateUse(sequenceId, useIndex, oldUse, newUse): Observable<Sequence>{
    return this.http.patch(
      this.generalData.setUrlParams(
        this.generalData.apiRoutes['interviewerRoutes']['updateUse'].path,
        {sequenceId, useIndex}
      ),
      rfc6902.createPatch(oldUse, newUse)
    )
      .map(this.generalData.extractData)
      .catch(this.generalData.handleError)
  }
}
