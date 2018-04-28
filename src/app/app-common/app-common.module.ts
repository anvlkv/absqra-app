import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';

const providers: Provider[] = [
  ApiService,
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: Crede
  // }
]

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
