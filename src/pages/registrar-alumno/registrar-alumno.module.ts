import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarAlumnoPage } from './registrar-alumno';

@NgModule({
  declarations: [
    RegistrarAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarAlumnoPage),
  ],
  exports: [
    RegistrarAlumnoPage
  ]
})
export class RegistrarAlumnoPageModule {}
