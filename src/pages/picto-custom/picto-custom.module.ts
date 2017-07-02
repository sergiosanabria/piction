import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictoCustomPage } from './picto-custom';

@NgModule({
  declarations: [
    PictoCustomPage,
  ],
  imports: [
    IonicPageModule.forChild(PictoCustomPage),
  ],
  exports: [
    PictoCustomPage
  ]
})
export class PictoCustomPageModule {}
