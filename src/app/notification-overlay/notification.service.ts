import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserNotification } from './user-notification';

@Injectable()
export class NotificationService {
  private confirmSource = new Subject<UserNotification>();

  confirm$ = this.confirmSource.asObservable();

  userConfirms(req) {
    // this.confirmSource.next(req);
  }

  // confirm(acceptance: boolean){
  //   // this.confirmSource.next({
  //   //
  //   // })
  // }
}
