import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceAnswerComponent } from './sequence-answer.component';

describe('SequenceAnswerComponent', () => {
  let component: SequenceAnswerComponent;
  let fixture: ComponentFixture<SequenceAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
