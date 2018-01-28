import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceCrudComponent } from './sequence-crud.component';

describe('SequenceCrudComponent', () => {
  let component: SequenceCrudComponent;
  let fixture: ComponentFixture<SequenceCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
