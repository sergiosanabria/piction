import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarAmigosPage } from './buscar-amigos';

@NgModule({
  declarations: [
    BuscarAmigosPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarAmigosPage),
  ],
  exports: [
    BuscarAmigosPage
  ]
})
export class BuscarAmigosPageModule {}
