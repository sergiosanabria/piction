import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, AlertController } from 'ionic-angular';
import { PictoPage } from "../picto/picto";
import { PalabraPage } from "../palabra/palabra";
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Api } from "../../providers/api";
// import {isUndefined} from "ionic-angular/umd/util/util";

/**
 * Generated class for the FrasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-frase',
    templateUrl: 'frase.html',
})
export class FrasePage {

    op: string;
    selectedFrase: any;
    frase: any;
    frases = [];
    played = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private tts: TextToSpeech, private alertCtrl: AlertController) {

        this.frase = this.navParams.get('frase');
        this.frases = this.navParams.get('frases');
        this.op = this.navParams.get('op');
        this.selectedFrase = this.frase.items;
        // if (this.op == 'new') {

        // }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FrasePage');
    }

    openPicto(fab: FabContainer) {

        fab.close();
        if (this.selectedFrase) {
            this.navCtrl.push(PictoPage, {
                selectedFrase: this.selectedFrase
            });
        } else {
            this.selectedFrase = [];
            this.navCtrl.push(PictoPage, {
                selectedFrase: this.selectedFrase
            });
        }

    }

    openPalabra(fab: FabContainer) {
        fab.close();
        if (this.selectedFrase) {
            this.navCtrl.push(PalabraPage, {
                selectedFrase: this.selectedFrase
            });
        } else {
            this.selectedFrase = [];
            this.navCtrl.push(PalabraPage, {
                selectedFrase: this.selectedFrase
            });
        }

    }

    playFrase() {
        let text = '';
        for (let t of this.selectedFrase) {
            text += ' ' + t.data.name;
        }

        if (!this.played) {

            this.played = true;
            this.tts.speak({
                text: text,
                locale: 'es-AR'
            }).then((data) => {
                this.played = false;
            });
        } else {
            this.tts.speak({
                text: '',
                locale: 'es-AR'
            }).then((data) => {
                console.log(data)
            });
            this.played = false;
        }

    }

    speak(item) {
        this.tts.speak({
            text: item.data.name,
            locale: 'es-AR'
        }).then((data) => {

        });

    }

    removeItem(item) {
        if (this.selectedFrase) {
            for (let k in this.selectedFrase) {
                if (item == this.selectedFrase[k]) {
                    this.selectedFrase.splice(k, 1);
                }
            }
        }
    }

    editName(item) {
        let alert = this.alertCtrl.create({
            title: 'Texto de imagen',
            inputs: [
                {
                    name: 'name',
                    value: item.data.name,
                    placeholder: 'Texto de la imagen'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {

                        console.log(data);
                        if (data.name) {
                            item.data.name = data.name;
                        } else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });

        alert.present();
    }

    save() {
        console.log(this.op);
        if (this.op == 'new') {
            this.frases.push(this.frase);
            // this.api.save('frases', this.frases);
        } else {
            //this.api.save('frases', this.frases);
        }
        // let toast = this.toast.create({
        //         message: 'Frase guardada',
        //         duration: 2000
        //     })
        this.navCtrl.pop();
    }

}
