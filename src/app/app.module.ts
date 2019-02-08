import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SpeakersComponent } from './pages/speakers/speakers.component';
import { MapComponent } from './pages/map/map.component';
import { AboutComponent } from './pages/about/about.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { MenuComponent } from './pages/modals/menu/menu.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SupportComponent } from './pages/support/support.component';
import { AlertComponent } from './pages/modals/alert/alert.component';
import { HomeComponent } from './pages/home/home.component';
import { FileSizePipe } from './pipe/file-size.pipe';
import { DropZoneDirective } from './directive/drop-zone.directive';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserTransferStateModule,
    AngularFireModule.initializeApp(environment.firebase, 'conference-app'),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  declarations: [
    AppComponent,
    ScheduleComponent,
    TabsComponent,
    SpeakersComponent,
    MapComponent,
    AboutComponent,
    TutorialComponent,
    MenuComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    SupportComponent,
    AlertComponent,
    HomeComponent,
    FileSizePipe,
    DropZoneDirective,
    UploadImageComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}