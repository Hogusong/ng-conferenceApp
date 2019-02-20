import { NgModule } from "@angular/core";
import { SetupRoutingModule } from "./setup-routing.module";
import { CommonModule } from "@angular/common";
import { SetupComponent } from "./setup.component";
import { SetupTabsComponent } from './setup-tabs/setup-tabs.component';
import { SessionsComponent } from './sessions/sessions.component';
import { FormsModule } from "@angular/forms";
import { SetupMenuComponent } from "./setup-menu/setup-menu.component";
import { SetupPeriodComponent } from "./setup-period/setup-period.component";
import { SessionEditComponent } from './sessions/session-edit/session-edit.component';
import { ConfirmComponent } from "./confirm/confirm.component";
import { SelectSpeakerComponent } from './sessions/select-speaker/select-speaker.component';
import { SelectTrackComponent } from './sessions/select-track/select-track.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { ImageUploadComponent } from './speakers/image-upload/image-upload.component';
import { FilesizePipe } from './filesize.pipe';
import { DropzoneDirective } from "./dropzone.directive";
import { TracksComponent } from './tracks/tracks.component';
import { TrackEditComponent } from './tracks/track-edit/track-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SetupRoutingModule
  ],
  declarations: [
    SetupComponent,
    SetupTabsComponent,
    SessionsComponent,
    SetupMenuComponent,
    SetupPeriodComponent,
    SessionEditComponent,
    ConfirmComponent,
    SelectSpeakerComponent,
    SelectTrackComponent,
    SpeakersComponent,
    SpeakerEditComponent,
    ImageUploadComponent,
    FilesizePipe,
    DropzoneDirective,
    TracksComponent,
    TrackEditComponent
  ]
})
export class SetupModule {}