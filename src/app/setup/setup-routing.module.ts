import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SetupComponent } from "./setup.component";
import { SessionsComponent } from "./sessions/sessions.component";

const setupRoutes: Routes = [
  { path: '', component: SetupComponent,
    children: [
      { path: 'sessions', component: SessionsComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(setupRoutes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}