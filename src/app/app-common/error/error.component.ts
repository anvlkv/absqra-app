import { Component, Input, OnInit } from '@angular/core';
import { st } from '@angular/core/src/render3';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  private _error;
  isJSON: boolean;
  @Input()
  set error(e: any){
    this._error = e;
    try {
      if (typeof e === 'object') {
        this.isJSON = true
      }
      else {
        const parsed = JSON.parse(e);
        this.isJSON = !!parsed;
        this._error = parsed;
      }
    } catch (e) {
      this.isJSON = false;
    }
  }

  get error(): any {
    return this._error;
  }

  constructor() { }

  ngOnInit() {
  }

}
