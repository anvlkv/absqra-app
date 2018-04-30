import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';
import { CredentialsInterceptor } from './credentials.interceptor';
import { DynamicStateDirective } from './dynamic-state.directive';
import { LoadingComponent } from './loading/loading.component';

const providers: Provider[] = [
  ApiService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  }
];

const directives = [
  DynamicStateDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [
    LoadingComponent
  ],
  declarations: [
    ...directives,
    LoadingComponent
  ],
  providers,
  exports: [
    ...directives
  ]
})
export class AppCommonModule {
  static forRoot() {
    return {
      module: NgModule,
      providers
    }
  }
}
