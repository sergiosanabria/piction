import { LazyImgComponent } from './../../directives/img-cache/components/lazy-img/lazy-img.component';
import { LazyLoadDirective } from './../../directives/img-cache/directives/lazy-load.directive';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictoPage } from './picto';

@NgModule({
  declarations: [
    PictoPage,
            LazyImgComponent,
        LazyLoadDirective
  ],
  imports: [
    IonicPageModule.forChild(PictoPage),
  ],
  exports: [
    PictoPage
  ]
})
export class PictoPageModule { }
