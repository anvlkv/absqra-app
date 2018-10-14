import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotKeysService implements OnDestroy {
  private readonly windowRef: Window;
  private subjectsStore: {
    [key: string]: BehaviorSubject<boolean>;
  } = {};
  private readonly keyUpListener: (event) => void;
  private readonly keyDownListener: (event) => void;

  private get mappedKeys(): string[] {
    return Object.keys(this.subjectsStore);
  }
  private set mappedKeys(keys: string[]) {
    throw new Error('Not implemented');
  }

  constructor(
  ) {
    this.windowRef = window;
    this.keyUpListener = (event) => {
      keysListener(event, false, this.mappedKeys, this.trigger.bind(this));
      return event;
    };
    this.keyDownListener = (event) => {
      keysListener(event, true, this.mappedKeys, this.trigger.bind(this));
      return event;
    };

    this.windowRef.addEventListener('keydown', this.keyDownListener);
    this.windowRef.addEventListener('keyup', this.keyUpListener);
  }

  private trigger(pressed: boolean, key: string) {
    this.subjectsStore[key].next(pressed);
  }

  ngOnDestroy(): void {
    this.windowRef.removeEventListener('keydown', this.keyDownListener);
    this.windowRef.removeEventListener('keyup', this.keyUpListener);
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
}

const focusableElements = [
  'input',
  'select',
  'textarea',
  'button',
  'a',
  'area'
];

function keysListener(event: KeyboardEvent, pressed: boolean, keys: string[], cb: Function) {
  try {
    const element = <HTMLElement>event.target;
    const tagName = element.tagName.toLowerCase();
    if (!focusableElements.includes(tagName) &&
      !element.getAttribute('contenteditable') &&
      keys.includes(event.code.toLowerCase())) {
      event.preventDefault();
      cb(pressed, event.code.toLowerCase());
      return false;
    }
    else {
      return event;
    }
  } catch (e) {
    return event;
  }
}
