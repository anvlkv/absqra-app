import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceResponseComponent } from './sequence-response.component';

describe('SequenceResponseComponent', () => {
  let component: SequenceResponseComponent;
  let fixture: ComponentFixture<SequenceResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SequenceResponseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
