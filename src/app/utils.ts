import { throwError } from 'rxjs/index';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';


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

export function formDeltaValue(form: FormGroup | FormArray): any {
  const value = {};
  for (const field in form.controls) {
    const control: AbstractControl = form.controls[field];
    if (control instanceof FormControl) {
      if (control.dirty) {
        value[field] = control.value;
      }
    }
    else if (control instanceof FormGroup || control instanceof FormArray) {
      const controlDeltaValue = formDeltaValue(control);
      if (Object.keys(controlDeltaValue).length > 0) {
        value[field] = controlDeltaValue;
      }
    }
  }
  return value;
}
