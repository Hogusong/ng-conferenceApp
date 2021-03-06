import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SetupComponent } from "./setup.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { SessionEditComponent } from "./sessions/session-edit/session-edit.component";
import { SpeakersComponent } from "./speakers/speakers.component";
import { SpeakerEditComponent } from "./speakers/speaker-edit/speaker-edit.component";
import { TracksComponent } from "./tracks/tracks.component";
import { TrackEditComponent } from "./tracks/track-edit/track-edit.component";
import { PartOfDayComponent } from "./part-of-day/part-of-day.component";
import { LocationsComponent } from "./locations/locations.component";
import { LocationEditComponent } from "./locations/location-edit/location-edit.component";

const setupRoutes: Routes = [
  { path: '', component: SetupComponent,
    children: [
      { path: 'sessions', component: SessionsComponent,
        children: [{ path: 'edit/:id', component: SessionEditComponent }]
      },
      { path: 'speakers', component: SpeakersComponent,
        children: [{ path: 'edit/:id', component: SpeakerEditComponent }]
      },
      { path: 'tracks', component: TracksComponent,
        children: [{ path: 'edit/:id', component: TrackEditComponent }]
      },
      { path: 'partOfDay', component: PartOfDayComponent },
      { path: 'locations', component: LocationsComponent,
        children: [{ path: 'edit/:id', component: LocationEditComponent }]
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(setupRoutes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}