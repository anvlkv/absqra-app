import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Sequence } from '../../../models/Sequence';
import { ResponseService } from '../../api/response.service';

@Injectable()
export class SequenceResolver implements Resolve<Sequence> {
  constructor (
    private response: ResponseService
  ) {

  }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.response.set$sequence(next.params.sequenceId);
  }
}
