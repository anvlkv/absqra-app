import { ComponentFixture } from '@angular/core/testing';

export function sendInput(inputElement: HTMLInputElement, fixture: ComponentFixture<any>, text: string ) {
  const e: Event = document.createEvent('Event');
  e.initEvent('input', false, false);
  inputElement.value = text;
  inputElement.dispatchEvent(e);
  fixture.detectChanges();
  return fixture.whenStable();
}
