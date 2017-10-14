import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GeneralDataService } from '../general-data.service';
import { Observable } from 'rxjs/Observable';
import { Sequence } from '../sequence';

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
}
