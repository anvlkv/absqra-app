import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { InterviewerModule } from 'app/interviewer/interviewer.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotificationOverlayComponent } from './notification-overlay/notification-overlay.component';
import { RespondentModule } from 'app/respondent/respondent.module';
import { GeneralDataService } from './general-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NotificationOverlayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RespondentModule,
    InterviewerModule,
    FormsModule,
    appRoutes
  ],
  providers: [
    GeneralDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
