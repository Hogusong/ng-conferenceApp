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
import { ConfirmComponent } from "./shared/confirm/confirm.component";
import { SelectSpeakerComponent } from './sessions/select-speaker/select-speaker.component';
import { SelectTrackComponent } from './sessions/select-track/select-track.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { ImageUploadComponent } from './speakers/image-upload/image-upload.component';
import { FilesizePipe } from './shared/filesize.pipe';
import { DropzoneDirective } from "./shared/dropzone.directive";
import { TracksComponent } from './tracks/tracks.component';
import { TrackEditComponent } from './tracks/track-edit/track-edit.component';
import { ChangeInfoComponent } from './shared/change-info/change-info.component';
import { PartOfDayComponent } from './part-of-day/part-of-day.component';
import { AmpmPipe } from './shared/ampm.pipe';

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
    TrackEditComponent,
    ChangeInfoComponent,
    PartOfDayComponent,
    AmpmPipe
  ]
})
export class SetupModule {}