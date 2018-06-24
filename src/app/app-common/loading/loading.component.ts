import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  indicator: string;
  animationInterval: any;

  private indicators = ['\u2500', '\u2572', '\u2502', '\u2571'];
  constructor() { }

  ngOnInit() {
    let indicatorIndex = 0;
    this.animationInterval = setInterval(() => {
      if (indicatorIndex > this.indicators.length - 1) {
        indicatorIndex = 0;
      }

      this.indicator = this.indicators[indicatorIndex];
      indicatorIndex ++;
    }, 77);
  }

  ngOnDestroy() {
    this.indicator = '\u27f9';
    clearInterval(this.animationInterval);
  }

}
