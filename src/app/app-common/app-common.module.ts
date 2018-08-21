import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';
import { CredentialsInterceptor } from './credentials.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { DynamicStateComponent } from './dynamic-state/dynamic-state.component';
import { CookieService } from 'ngx-cookie-service';
import { ErrorComponent } from './error/error.component';
import { DataService } from './data-service/data.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotKeysService } from './hot-keys.service';
import { DisabledContentComponent } from './disabled-content/disabled-content.component';
import { DynamicStateErrorHandler } from './dynamic-state/dynamic-state-error.handler';

const providers: Provider[] = [
  ApiService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: DynamicStateErrorHandler
  },
  CookieService,
  DataService,
  HotKeysService
];

const declareAndExport = [
  DynamicStateComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxJsonViewerModule
  ],
  entryComponents: [
    LoadingComponent
  ],
  declarations: [
    ...declareAndExport,
    LoadingComponent,
    ErrorComponent,
    DisabledContentComponent,
  ],
  providers: [
    ...providers
  ],
  exports: [
    ...declareAndExport
  ]
})
export class AppCommonModule {
  static forRoot() {
    return {
      ngModule: AppCommonModule,
      providers
    }
  }
}
