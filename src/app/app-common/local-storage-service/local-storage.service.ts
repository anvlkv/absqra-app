import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage{
  readonly length: number;

  private ls;
  constructor(

  ) {
    this.ls = localStorage;
  }


  clear(): void {
    this.ls.clear();
  }

  getItem(key: string): any {
    const item = this.ls.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  key(index: number): string | null {
    return this.ls.key(index);
  }

  removeItem(key: string): void {
    this.ls.removeItem(key)
  }

  setItem(key: string, value: any): void {
    this.ls.setItem(key, value);
  }
}
