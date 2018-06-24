import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../api-models';
import { DataService } from '../../app-common/data.service';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { CRUDRouter } from '../../../api-routes/CRUDRouter';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/index';
import { ComponentDynamicStates } from '../../app-common/dynamic-state/dynamic-state.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Operation } from 'fast-json-patch';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project;
  state: Observable<ComponentDynamicStates>;
  projectForm: FormGroup;

  private projectSubscription: Subscription;
  private $state = new BehaviorSubject<ComponentDynamicStates>(ComponentDynamicStates.LOADING);

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.state = this.$state.asObservable();
  }

  ngOnInit() {
    this.projectSubscription = this.route.params.pipe(
      flatMap(({projectId}) => {
        return this.data.getData<Project>(CRUDRouter.getProject, {projectId})
      })
    ).subscribe(project => {
      this.project = project;
      this.projectForm = this.fb.group({name: project.name, description: project.description});
      this.$state.next(ComponentDynamicStates.VIEWING);
    });
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  editProject() {
    this.$state.next(ComponentDynamicStates.EDITING);
  }

  save() {
    if (this.projectForm.valid) {
      this.data.postData<Project>(CRUDRouter.saveProject, {projectId: this.project.id}, this.projectForm.value).subscribe(savedProject => {
        this.project = savedProject;
        this.$state.next(ComponentDynamicStates.VIEWING)
      }, e => this.$state.next(ComponentDynamicStates.FAILING));
    }
  }

  onSequenceIdChange(id: number) {
    this.data.patchData<Project>(CRUDRouter.updateProject, {projectId: this.project.id}, [<Operation>{
      op: this.project.topSequenceId ? 'replace' : 'add',
      path: '/topSequence',
      value: {id}
    }]).subscribe(updatedProject => {
      this.project = updatedProject;
    }, e => this.$state.next(ComponentDynamicStates.FAILING));
  }
}
