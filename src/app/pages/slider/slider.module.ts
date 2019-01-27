import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { SliderComponent } from './slider.component';
import { SwipeService } from '../../providers/swipe.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule
  ],
  declarations: [
    SliderComponent
  ],
  entryComponents: [
    SliderComponent
  ],
  providers: [
    SwipeService
  ]
})
export class SliderModule { }