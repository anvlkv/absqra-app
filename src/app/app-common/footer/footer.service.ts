import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FooterService {

  public status = new Subject<string>();

  constructor() {
  }

}
