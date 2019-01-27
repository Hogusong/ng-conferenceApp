import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
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