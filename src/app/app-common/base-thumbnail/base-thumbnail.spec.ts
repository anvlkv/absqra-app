import { Component } from '@angular/core';
import { Base } from 'models/api-models';
import { BaseThumbnail } from './base-thumbnail';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('BaseThumbnail', () => {
  @Component({
    selector: 'app-test-cmp',
    template: '<div></div>',
  })
  class TestExtendingComponent extends BaseThumbnail<Base> {}

  let component: TestExtendingComponent;
  let fixture: ComponentFixture<TestExtendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestExtendingComponent,
      ]
    }).compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestExtendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
