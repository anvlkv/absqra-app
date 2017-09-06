import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { UserNotification } from './user-notification';

@Component({
  selector: 'app-notification-overlay',
  templateUrl: './notification-overlay.component.html',
  styleUrls: ['./notification-overlay.component.scss'],
  providers: [NotificationService]
})
export class NotificationOverlayComponent implements OnInit {
  activeNotification: UserNotification;

  constructor(private ns: NotificationService) {
  }

  ngOnInit() {
    this.ns.confirm$.subscribe(req => {
      this.activeNotification = req;
    });
  }

  confirm(acceptance: boolean) {
    // this.ns.confirm$.
  }

}
