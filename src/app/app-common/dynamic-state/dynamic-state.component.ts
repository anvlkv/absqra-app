import {
  AfterContentInit, Component, ContentChild, Input, OnInit,
  TemplateRef, ViewChild,
} from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { DisabledContentComponent } from '../disabled-content/disabled-content.component';
import { debounceTime, map, reduce } from 'rxjs/operators';
import { s } from '@angular/core/src/render3';

export type DynamicState = ComponentDynamicStates | ImmediateStateConfiguration;

export enum ComponentDynamicStates {
  EMPTY = 'empty',
  LOADING = 'load',
  VIEWING = 'view',
  EDITING = 'edit',
  INTERIM = 'interim',
  FAILING = 'fail',
  DELETED = 'delete'
}

export interface ImmediateStateConfiguration {
  state: ComponentDynamicStates,
  err?: any;
  deleted?: any;
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

  @ContentChild('emptyTemplate')
  public emptyTemplate: TemplateRef<any>;
  @ViewChild('defaultEmptyTemplate')
  defaultEmptyTemplate: TemplateRef<any>;

  @ContentChild('defaultTemplate')
  defaultTemplate: TemplateRef<any>;
  @ViewChild('fallbackTemplate')
  fallbackTemplate: TemplateRef<any>;

  private _editingTemplate: TemplateRef<any>;
  stateContext: {[prop: string]: string | number | boolean} = {};


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


  @ContentChild('failingTemplate')
  public failingTemplate: TemplateRef<any>;

  private _stateSubscription: Subscription;
  private _observableState: Observable<ComponentDynamicStates | ImmediateStateConfiguration>;
  private currentTemplate: TemplateRef<any>;

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

    this._stateSubscription = observableState.pipe(
      debounceTime(42)
    ).subscribe(state => {
      if (typeof state == 'string') {
        this.displayState(<ComponentDynamicStates>state);
        this.stateContext = {};
      }
      else {
        this.displayState(state.state);
        this.stateContext = {...state};
      }
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

    this.stateContext.interimState = state == ComponentDynamicStates.INTERIM;

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
      case ComponentDynamicStates.INTERIM: {
        resolved = this.currentTemplate;
        break;
      }
      case ComponentDynamicStates.FAILING: {
        resolved = this.failingTemplate || this.defaultFailingTemplate;
        break;
      }
      case ComponentDynamicStates.EMPTY: {
        resolved = this.emptyTemplate || this.defaultEmptyTemplate ;
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

export function stateCombinator(...statesToCombine: Observable<DynamicState>[]): Observable<DynamicState> {
  return combineLatest(
    ...statesToCombine
  ).pipe(
    map((states) => {
      return states.reduce((acc, state, at, all) => {
        const prior = all[at - 1];
        const priorState = prior instanceof Object ? (<ImmediateStateConfiguration>prior).state : prior;
        if (!prior || [ComponentDynamicStates.VIEWING, ComponentDynamicStates.EDITING].includes(priorState)) {
          acc = state;
        }
        else {
          acc = prior;
        }
        return <DynamicState> acc;
      })
    })
  )
}
