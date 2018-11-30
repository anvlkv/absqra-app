import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopSequenceUIService {
  template: Observable<TemplateRef<any>>;

  $template: Subject<TemplateRef<any>>;
  constructor() {
    this.$template = new Subject<TemplateRef<any>>();
    this.template = this.$template.asObservable();
  }
}
