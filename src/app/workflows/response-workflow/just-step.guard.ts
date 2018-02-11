import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ResponseService } from '../../api/response.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class JustStepGuard implements CanActivateChild {
  constructor (
    private response: ResponseService
  ) {
  }

  canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(next, state);
    const $: Subject<boolean> = new Subject();

    this.response.nextStep().subscribe(step => {
      console.log(step);

      $.next(!!step);
    });

    return $.asObservable();
  }
}
