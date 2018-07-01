import { throwError } from 'rxjs/index';
import { HttpErrorResponse } from '@angular/common/http';


export function unpackEnum(en: {}) {
  return [...Object.keys(en)].map(k => en[k]);
};

export function errorHandler(triggeredBy?) {
  return function (response: HttpErrorResponse | any, ) {
    // In a real world app, you might use a remote logging infrastructure
    triggeredBy ? console.error(`err at: ${triggeredBy}`) : null;

    return throwError(response.error || response);
  };
}
