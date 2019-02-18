import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SetupComponent } from "./setup.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { SessionEditComponent } from "./sessions/session-edit/session-edit.component";

const setupRoutes: Routes = [
  { path: '', component: SetupComponent,
    children: [
      { path: 'sessions', component: SessionsComponent,
        children: [
          { path: 'edit/:id', component: SessionEditComponent }
        ]
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(setupRoutes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}