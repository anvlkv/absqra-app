import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoInputComponent } from './yes-no-input.component';

describe('YesNoInputComponent', () => {
  let component: YesNoInputComponent;
  let fixture: ComponentFixture<YesNoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display yes button', () => {
    expect(fixture.elementRef.nativeElement.querySelector('button.yes')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelectorAll('button').length).toEqual(1);
  });

  it('should display yes and no buttons', () => {
    expect(fixture.elementRef.nativeElement.querySelector('button.yes')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelector('button.no')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelectorAll('button').length).toEqual(2);
  });

  it('should display yes, no and n/a buttons', () => {
    expect(fixture.elementRef.nativeElement.querySelector('button.yes')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelector('button.no')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelector('button.n-a')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelectorAll('button').length).toEqual(3);
  });
  
});
