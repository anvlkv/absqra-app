import { ComponentFactoryResolver, ComponentRef, Directive, Input, TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

@Directive({
  selector: '[appDynamicState]'
})
export class DynamicStateDirective {

  private stateComponentRef: ComponentRef<LoadingComponent | any>;

  @Input()
  set appDynamicState(dataItems: any[] | any) {
    dataItems = [].concat(dataItems);
    this.viewContainer.clear();
    if (dataItems.every(d => !!d)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.displayInternalState();
    }
  }

  private displayInternalState() {
    const loadingComponentFactory = this.cf.resolveComponentFactory(LoadingComponent);

    this.stateComponentRef = this.viewContainer.createComponent(loadingComponentFactory);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cf: ComponentFactoryResolver
  ) {
  }

}
