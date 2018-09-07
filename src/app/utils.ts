import { throwError } from 'rxjs/index';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';


export function unpackEnum(en: {}) {
  return [...Object.keys(en)].map(k => en[k]);
}

export function errorHandler(triggeredBy?) {
  return function (response: HttpErrorResponse | any, ) {
    if (!environment.production) {
      triggeredBy ? console.error(`err at: ${triggeredBy}`) : null;
      console.trace(response);
    }
    return throwError(response.error || response);
  };
}
