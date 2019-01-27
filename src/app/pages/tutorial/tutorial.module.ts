import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { TutorialComponent } from './tutorial.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
  ],
  declarations: [
    TutorialComponent,
  ],
  bootstrap: [TutorialComponent],
  providers: []
})
export class TutorialModule {}