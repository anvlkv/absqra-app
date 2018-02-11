import { Component, OnInit } from '@angular/core';
import { GeneralDataService } from './api/general-data.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ready: boolean;

  constructor(
    private api: GeneralDataService,
    public ttl: Title
  ) {
    this.ttl.setTitle('...loading');
  }

  async ngOnInit() {
    this.ready = await this.api.ready;
    // console.log(ready);
    this.ttl.setTitle('Intervey');
  }
}
