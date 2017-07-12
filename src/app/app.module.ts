import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RespondentModule} from './respondent/respondent.module';
import {InterviewerModule} from './interviewer/interviewer.module';
import {RouterModule} from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {appRoutes} from './app.routes';
import {MockDataService} from './mock-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RespondentModule,
    InterviewerModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
