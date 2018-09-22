import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectThumbnailComponent } from './project-thumbnail.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectThumbnailComponent', () => {
  let component: ProjectThumbnailComponent;
  let fixture: ComponentFixture<ProjectThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProjectThumbnailComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectThumbnailComponent);
    component = fixture.componentInstance;
    component.dataItem = {id: '0', name: 'a'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
