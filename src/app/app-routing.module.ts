import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SpeakersComponent } from './pages/speakers/speakers.component';
import { MapComponent } from './pages/map/map.component';
import { AboutComponent } from './pages/about/about.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { SupportComponent } from './pages/support/support.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { SessionComponent } from './pages/session/session.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'schedule', component: ScheduleComponent,
    children: [
      { path: 'session/:id', component: SessionComponent },
    ] 
  },
  { path: 'speakers', component: SpeakersComponent,
    children: [
      { path: 'session/:id', component: SessionComponent },
    ] 
  },
  { path: 'map', component: MapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'support', component: SupportComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tutorial', component: TutorialComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
