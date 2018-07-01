import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectThumbnailComponent } from './project-thumbnail.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectThumbnailComponent', () => {
  let component: ProjectThumbnailComponent;
  let fixture: ComponentFixture<ProjectThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectThumbnailComponent,
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
