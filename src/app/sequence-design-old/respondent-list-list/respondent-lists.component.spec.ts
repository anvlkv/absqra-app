import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentListsComponent } from './respondent-lists.component';

describe('RespondentListsComponent', () => {
  let component: RespondentListsComponent;
  let fixture: ComponentFixture<RespondentListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
