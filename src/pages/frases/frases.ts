import { SlideFrasePage } from './../slide-frase/slide-frase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FrasePage } from "../frase/frase";
import { Api } from "../../providers/api";
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the FrasesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-frases',
    templateUrl: 'frases.html',
})
export class FrasesPage {

    frases = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private toast: ToastController, private tts: TextToSpeech) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FrasesPage');
    }

    nuevaFrase() {

        let frase = {
            name: '',
            description: '',
            id: this.api.getMaxId(this.frases),
            items: []
        };

        this.navCtrl.push(FrasePage, {
            frase: frase,
            frases: this.frases,
            op: 'new'
        }, {});
    }

    playFrase(frase) {
        let text = '';
        for (let t of frase.items) {
            text += ' ' + t.data.name;
        }
        this.tts.speak({
            text: text,
            locale: 'es-AR'
        }).then((data) => {

        });

    }


    editarFrase(frase) {

        this.navCtrl.push(FrasePage, {
            frase: frase,
            op: 'edit',
            frases: this.frases
        });
    }

    openSlide(frase) {
        this.navCtrl.push(SlideFrasePage, {
            frase: frase
        });
    }



}
