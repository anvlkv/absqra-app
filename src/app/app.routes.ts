import {Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
/**
 * Created by a.nvlkv on 12/07/2017.
 */
export const appRoutes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'ask', loadChildren: './interviewer#InterviewerModule' },
  {path: 'answer', loadChildren: './respondent#RespondentModule' }
];
