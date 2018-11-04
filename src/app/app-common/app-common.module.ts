import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api-service/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';
import { CredentialsInterceptor } from './api-service/credentials.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { DynamicStateComponent } from './dynamic-state/dynamic-state.component';
import { CookieService } from 'ngx-cookie-service';
import { ErrorComponent } from './error/error.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotKeysService } from './hot-keys-service/hot-keys.service';
import { DisabledContentComponent } from './disabled-content/disabled-content.component';
import { DynamicStateErrorHandler } from './dynamic-state/dyanmic-state.error-handler';
import { WebSocketService } from './web-socket-service/web-socket.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FooterService } from './footer/footer.service';
import { InFlowTipComponent } from './in-flow-tip/in-flow-tip.component';
import { LocalStorageService } from './local-storage-service/local-storage.service';

const providers: Provider[] = [
  ApiService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  },
  CookieService,
  HotKeysService,
  WebSocketService,
  FooterService,
  LocalStorageService
];

const declareAndExport = [
  DynamicStateComponent,
  HeaderComponent,
  FooterComponent,
  InFlowTipComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxJsonViewerModule
  ],
  entryComponents: [
    LoadingComponent
  ],
  declarations: [
    ...declareAndExport,
    LoadingComponent,
    ErrorComponent,
    DisabledContentComponent
  ],
  providers: [
    DynamicStateErrorHandler
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
