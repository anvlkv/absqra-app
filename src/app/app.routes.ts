import {Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
/**
 * Created by a.nvlkv on 12/07/2017.
 */
export const appRoutes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'ask', loadChildren: 'app/interviewer#InterviewerModule' },
  {path: 'answer', loadChildren: 'app/respondent#RespondentModule' }
];
