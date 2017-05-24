import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrasesPage } from './frases';

@NgModule({
  declarations: [
    FrasesPage,
  ],
  imports: [
    IonicPageModule.forChild(FrasesPage),
  ],
  exports: [
    FrasesPage
  ]
})
export class FrasesPageModule {}
