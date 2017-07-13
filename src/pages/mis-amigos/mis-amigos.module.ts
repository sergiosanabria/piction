import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisAmigosPage } from './mis-amigos';

@NgModule({
  declarations: [
    MisAmigosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisAmigosPage),
  ],
  exports: [
    MisAmigosPage
  ]
})
export class MisAmigosPageModule {}
