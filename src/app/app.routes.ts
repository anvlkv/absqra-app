import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InterviewerModule } from './interviewer/interviewer.module';
import { RespondentModule } from './respondent/respondent.module';
/**
 * Created by a.nvlkv on 12/07/2017.
 */
const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'ask', component: InterviewerModule},
  {path: 'answer', component: RespondentModule}
];
export const appRoutes = RouterModule.forRoot(routes);
