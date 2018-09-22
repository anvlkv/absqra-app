import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './app-common/web-socket-service/web-socket.service';
import { wsUtil } from 'models/api-routes/wsUtil';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private socket: WebSocketService
  ) {
    this.socket.connect(wsUtil.clientReload.path).subscribe((event) => {
      if (event.data == 'reload') {
        window.location.reload();
      }
    }, e => {
      console.log(e);
    })
  }

  ngOnInit() {
  }
}
