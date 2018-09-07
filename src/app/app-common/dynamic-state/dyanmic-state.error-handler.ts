import { ErrorHandler, Injectable } from '@angular/core';
import { DynamicStateComponent } from './dynamic-state.component';


@Injectable()
export class DynamicStateErrorHandler implements ErrorHandler {
  constructor() {
    console.log('imhere');
  }
  handleError(error: any): void {
    alert(error);
  }
}
