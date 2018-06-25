import {
  AfterContentInit, Component, ContentChild, Input, OnInit,
  TemplateRef, ViewChild,
} from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { Observable, Subscription } from 'rxjs/index';

export type DynamicState = ComponentDynamicStates | ImmediateStateConfiguration;

export enum ComponentDynamicStates {
  LOADING = 'load',
  VIEWING = 'view',
  EDITING = 'edit',
  SAVING = 'save',
  FAILING = 'fail'
}

export interface ImmediateStateConfiguration {
  state: ComponentDynamicStates,
  err?: any;
}

@Component({
  selector: 'app-dynamic-state',
  templateUrl: './dynamic-state.component.html',
  styleUrls: ['./dynamic-state.component.scss']
})
export class DynamicStateComponent implements OnInit, AfterContentInit {
  private currentState: ComponentDynamicStates;

  @ContentChild('loadingTemplate')
  public loadingTemplate: TemplateRef<any>;

  @ViewChild('defaultLoadingTemplate')
  defaultLoadingTemplate: TemplateRef<LoadingComponent>;

  @ContentChild('viewingTemplate')
  public viewingTemplate: TemplateRef<any>;
  @ViewChild('defaultFailingTemplate')
  defaultFailingTemplate: TemplateRef<ErrorComponent>;


  @ContentChild('defaultTemplate')
  defaultTemplate: TemplateRef<any>;
  @ViewChild('fallbackTemplate')
  fallbackTemplate: TemplateRef<any>;


  private _editingTemplate: TemplateRef<any>;
  stateContext: {[prop: string]: string | number};

  @ContentChild('editingTemplate')
  public set editingTemplate (template: TemplateRef<any>) {
    if (template) {
      this._editingTemplate = template;
      this.displayState(this.currentState);
    }
    else {
      this.displayState();
      this._editingTemplate = null;
    }
  }
  public get editingTemplate(): TemplateRef<any> {
    return this._editingTemplate;
  }


  @ContentChild('savingTemplate')
  public savingTemplate: TemplateRef<any>;

  @ContentChild('failingTemplate')
  public failingTemplate: TemplateRef<any>;

  private _stateSubscription: Subscription;
  private _observableState: Observable<ComponentDynamicStates | ImmediateStateConfiguration>;
  private currentTemplate: TemplateRef<any>;

  private ready: boolean;

  @Input()
  set state(state: Observable<DynamicState>) {
    if (state) {
      this._observableState = state;
      if (this.currentState) {
        this.updateSubscription(state);
      }
    }
  }

  constructor(
  ) { }

  private updateSubscription(observableState) {
    if (this._stateSubscription && !this._stateSubscription.closed) {
      this._stateSubscription.unsubscribe();
    }

    this._stateSubscription = observableState.subscribe(state => {
      if (typeof state == 'string') {
        this.displayState(<ComponentDynamicStates>state);
        this.stateContext = null;
      }
      else {
        this.displayState(state.state);
        this.stateContext = {...state};
      }

      this.ready = state == ComponentDynamicStates.VIEWING || state == ComponentDynamicStates.EDITING
    });
  }

  ngAfterContentInit(): void {
    if (!this.currentState) {
      this.updateSubscription(this._observableState);
    }
    else {
      this.displayState(this.currentState);
    }
  }

  private resolveTemplate(state: ComponentDynamicStates): TemplateRef<any> {
    let resolved;
    switch (state) {
      case undefined:
      case ComponentDynamicStates.LOADING: {
        resolved = this.loadingTemplate || this.defaultLoadingTemplate;
        break;
      }
      case ComponentDynamicStates.VIEWING: {
        resolved = this.viewingTemplate;
        break;
      }
      case ComponentDynamicStates.EDITING: {
        resolved = this.editingTemplate;
        break;
      }
      case ComponentDynamicStates.SAVING: {
        resolved = this.savingTemplate;
        break;
      }
      case ComponentDynamicStates.FAILING: {
        resolved = this.failingTemplate || this.defaultFailingTemplate;
        break;
      }
      default: {
        throw Error(`unknown dynamic state - ${state}`);
      }
    }

    return resolved || this.defaultTemplate || this.fallbackTemplate;
  }


  private displayState(state?: ComponentDynamicStates) {
    if (this.currentState !== state) {
      this.currentTemplate = this.resolveTemplate(state);
      this.currentState = state;
    }
  }

  ngOnInit() {
    this.displayState(this.currentState);
  }

}
