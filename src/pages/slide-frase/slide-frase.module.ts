import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideFrasePage } from './slide-frase';

@NgModule({
  declarations: [
    SlideFrasePage,
  ],
  imports: [
    IonicPageModule.forChild(SlideFrasePage),
  ],
  exports: [
    SlideFrasePage
  ]
})
export class SlideFrasePageModule {}
