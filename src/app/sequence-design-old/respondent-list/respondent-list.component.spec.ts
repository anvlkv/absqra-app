import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentListComponent } from './respondent-list.component';

describe('RespondentListComponent', () => {
  let component: RespondentListComponent;
  let fixture: ComponentFixture<RespondentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
