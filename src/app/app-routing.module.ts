import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SpeakersComponent } from './pages/speakers/speakers.component';
import { MapComponent } from './pages/map/map.component';
import { AboutComponent } from './pages/about/about.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent },
  { path: 'speakers', component: SpeakersComponent },
  { path: 'map', component: MapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tutorial', component: TutorialComponent},
  { path: '', redirectTo: 'tutorial', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
