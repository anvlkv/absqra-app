import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { InterviewerModule } from 'app/interviewer/interviewer.module';
import { LandingPageComponent } from 'app/landing-page/landing-page.component';
import { MockDataService } from 'app/mock-data.service';
import { NotificationOverlayComponent } from 'app/notification-overlay/notification-overlay.component';
import { RespondentModule } from 'app/respondent/respondent.module';

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
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
