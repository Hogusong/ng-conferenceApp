import { NgModule } from "@angular/core";
import { SetupRoutingModule } from "./setup-routing.module";
import { CommonModule } from "@angular/common";
import { SetupComponent } from "./setup.component";
import { SetupTabsComponent } from './setup-tabs/setup-tabs.component';
import { SessionsComponent } from './sessions/sessions.component';
import { FormsModule } from "@angular/forms";
import { SetupMenuComponent } from "./setup-menu/setup-menu.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SetupRoutingModule],
  declarations: [
    SetupComponent,
    SetupTabsComponent,
    SessionsComponent,
    SetupMenuComponent
  ]
})
export class SetupModule {}