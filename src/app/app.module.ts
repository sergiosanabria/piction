import { ImgcacheService } from './../directives/img-cache/services/cache-img/cache-img.service';
import { LazyImgComponent } from './../directives/img-cache/components/lazy-img/lazy-img.component';
import { LazyLoadDirective } from './../directives/img-cache/directives/lazy-load.directive';
import { PerfilPageModule } from './../pages/perfil/perfil.module';
// import { ImgDirective } from './../directives/img/img';
import { CacheModule } from 'ionic-cache';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { PictoCustomPageModule } from './../pages/picto-custom/picto-custom.module';
import { RegistrarPageModule } from './../pages/registrar/registrar.module';
import { ActividadPageModule } from './../pages/actividad/actividad.module';
import { ActividadesPageModule } from './../pages/actividades/actividades.module';
import { Config } from './config/config';
import { ApiProvider } from './../providers/api/api';
import { LoginPageModule } from './../pages/login/login.module';
import { DatePicker } from '@ionic-native/date-picker';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PictoPageModule } from "../pages/picto/picto.module";
import { HttpModule } from "@angular/http";
import { FilterPipe } from "../pipes/filter";
import { FrasePageModule } from "../pages/frase/frase.module";
import { PalabraPageModule } from "../pages/palabra/palabra.module";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { FrasesPageModule } from "../pages/frases/frases.module";
import { SlideFrasePageModule } from "../pages/slide-frase/slide-frase.module";
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from "@ionic/storage";
import { MsgProvider } from '../providers/msg/msg';


@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        FilterPipe,

        // ImgDirective


    ],
    imports: [

        BrowserModule,
        LoginPageModule,
        RegistrarPageModule,
        PerfilPageModule,
        PictoPageModule,
        PictoCustomPageModule,
        FrasePageModule,
        PalabraPageModule,
        FrasesPageModule,
        ActividadesPageModule,
        ActividadPageModule,
        SlideFrasePageModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        CacheModule.forRoot(),
        IonicStorageModule.forRoot({
            name: '__piction',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        LazyImgComponent

    ],
    providers: [
        StatusBar,
        SplashScreen,
        FilterPipe,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ApiProvider,
        TextToSpeech,
        AuthProvider,
        MsgProvider,
        DatePicker,
        Config,
        Transfer,
        File,
        ImagePicker,
        Crop,
        ImgcacheService


    ]
})
export class AppModule {
}
