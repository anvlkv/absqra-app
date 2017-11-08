import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceHeaderEditorComponent } from './sequence-header-editor.component';

describe('SequenceHeaderEditorComponent', () => {
  let component: SequenceHeaderEditorComponent;
  let fixture: ComponentFixture<SequenceHeaderEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceHeaderEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceHeaderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
