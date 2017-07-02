import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActividadesPage } from './actividades';

@NgModule({
  declarations: [
    ActividadesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActividadesPage),
  ],
  exports: [
    ActividadesPage
  ]
})
export class ActividadesPageModule {}
