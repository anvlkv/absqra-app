// source https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element

import { AfterContentInit, Directive, ElementRef, Input, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit, AfterContentInit {
  private _autoFocus;
  constructor(
    private el: ElementRef,
    private zone: NgZone) {

  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    if (this._autoFocus || typeof this._autoFocus === 'undefined') {
      setTimeout(() => { // see https://github.com/angular/angular/issues/15634
        this.el.nativeElement.focus();  // For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
      });
    }
  }

  @Input() set autoFocus(condition: boolean) {
    this._autoFocus = condition != false;
  }
}
