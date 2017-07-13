import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudesRecibidasPage } from './solicitudes-recibidas';

@NgModule({
  declarations: [
    SolicitudesRecibidasPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudesRecibidasPage),
  ],
  exports: [
    SolicitudesRecibidasPage
  ]
})
export class SolicitudesRecibidasPageModule {}
