import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HotKeysService {
  private windowRef: Window;
  private subjectsStore: {
    [key: string]: BehaviorSubject<boolean>;
  } = {};
  private get mappedKeys(): string[] {
    return Object.keys(this.subjectsStore);
  }
  private set mappedKeys(keys: string[]) {
    throw new Error('Not implemented');
  }

  constructor(
  ) {
    this.windowRef = window;
    this.windowRef.addEventListener('keydown', event => {
      return this.keysListener(event, true);
    });
    this.windowRef.addEventListener('keyup', event => {
      return this.keysListener(event, false);
    });
  }

  private keysListener(event: KeyboardEvent, pressed: boolean) {
    try {
      const tagName = (<HTMLElement>event.target).tagName.toLowerCase();
      if (tagName == 'body' && this.mappedKeys.includes(event.code.toLowerCase())) {
        event.preventDefault();
        this.trigger(pressed, event.code.toLowerCase());
        return false;
      }
      else {
        return event;
      }
    } catch (e) {
      console.log(e);
      return event;
    }
  }

  on(...keys: string[]): Observable<boolean> {
    const subjects: Observable<boolean>[] = [];
    keys.forEach(key => {
      key.toLowerCase();
      if (!this.mappedKeys.includes(key)) {
        this.subjectsStore[key] = new BehaviorSubject(false);
      }
      subjects.push(this.subjectsStore[key].asObservable());
    });

    return combineLatest(...subjects).pipe(
      debounceTime(150),
      map((values) => {
        return values.every(v => !!v);
      })
    );
  }

  off(...keys: string[]) {

  }

  trigger(pressed: boolean, key: string) {
    this.subjectsStore[key].next(pressed);
    console.log(pressed);
  }
}
