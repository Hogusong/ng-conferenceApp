import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MenuComponent } from './pages/menu/menu.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SupportComponent } from './pages/support/support.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserTransferStateModule,
    AngularFireModule.initializeApp(environment.firebase, 'conference-app'),
    AngularFirestoreModule,
    AngularFireStorageModule    
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
    SigninComponent,
    SupportComponent,
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}