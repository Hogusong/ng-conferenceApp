import { NgModule } from "@angular/core";
import { SetupRoutingModule } from "./setup-routing.module";
import { CommonModule } from "@angular/common";
import { SetupComponent } from "./setup.component";

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule],
  declarations: [SetupComponent]
})
export class SetupModule {}