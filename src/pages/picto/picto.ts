import {Component} from '@angular/core';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from "../../providers/api";

/**
 * Generated class for the PictoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-picto',
    templateUrl: 'picto.html',
})
export class PictoPage {

    search = '';
    played = false;
    pictogramas: any;
    pictogramasShow: any;

    selectedFrase: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private tts: TextToSpeech) {

        this.selectedFrase = this.navParams.get('selectedFrase');

        this.api.getJSON('pictogramas.json').subscribe((response) => {
            this.pictogramas = response.json();
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PictoPage');
    }

    onInput() {

        let limit = 50;
        let cant = 0;

        this.pictogramasShow = [];

        if (this.search.trim() != '') {

            for (let item of this.pictogramas) {
                let str = JSON.stringify(item);
                str = str.toLowerCase();
                this.search = this.search.toLowerCase();

                if (str.indexOf(this.search) >= 0) {
                    if (limit > cant) {
                        cant++;
                        this.pictogramasShow.push(item);
                    } else {
                        return true;
                    }

                }
            }
        }
    }

    addPictograma(pic) {
        this.selectedFrase.push({
            data: pic,
            type: 'picto',
        })
    }

    speak(pic) {
        let text = '';

        this.played = true;
        this.tts.speak({
            text: pic.name,
            locale: 'es-AR'
        }).then((data) => {
            console.log(data)
        });

    }

}
