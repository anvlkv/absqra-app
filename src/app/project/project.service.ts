import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Project } from '../../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public activeProject: ReplaySubject<Project>;

  constructor() {
    this.activeProject = new ReplaySubject<Project>(1);
  }
}
