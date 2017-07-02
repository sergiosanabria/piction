import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictoPage } from './picto';

@NgModule({
  declarations: [
    PictoPage,
  ],
  imports: [
    IonicPageModule.forChild(PictoPage),
  ],
  exports: [
    PictoPage
  ]
})
export class PictoPageModule { }
