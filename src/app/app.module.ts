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
import { Api } from "../providers/api";
import { FrasePageModule } from "../pages/frase/frase.module";
import { PalabraPageModule } from "../pages/palabra/palabra.module";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { FrasesPageModule } from "../pages/frases/frases.module";
import { SlideFrasePageModule } from "../pages/slide-frase/slide-frase.module";
import { NativeStorage } from '@ionic-native/native-storage';


@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        FilterPipe
    ],
    imports: [
        BrowserModule,
        PictoPageModule,
        FrasePageModule,
        PalabraPageModule,
        FrasesPageModule,
        SlideFrasePageModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FilterPipe,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Api,
        TextToSpeech,
        NativeStorage
    ]
})
export class AppModule {
}
