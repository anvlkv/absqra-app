import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';
import { CredentialsInterceptor } from './credentials.interceptor';

const providers: Provider[] = [
  ApiService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers
})
export class AppCommonModule {
  static forRoot() {
    return {
      module: NgModule,
      providers
    }
  }
}
