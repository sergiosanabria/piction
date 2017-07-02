import { MsgProvider } from './../../providers/msg/msg';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, AlertController } from 'ionic-angular';
import { PictoPage } from "../picto/picto";
import { PalabraPage } from "../palabra/palabra";
import { TextToSpeech } from '@ionic-native/text-to-speech';
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
    frases: any;
    callBackFn: any;
    played = false;

    resource = "frases";

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private api: ApiProvider,
        private msg: MsgProvider,
        private tts: TextToSpeech, private alertCtrl: AlertController) {

        this.frase = this.navParams.get('frase');
        // this.frases = this.navParams.get('frases');
        this.callBackFn = this.navParams.get('callBackFn');
        this.op = this.navParams.get('op');
        this.selectedFrase = this.frase.items;
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

            if (this.op == "edit") {
                this.api.delete(this.resource, item.id + "/item").then(() => {
                    this.popItem(item);
                });
            } else {
                this.popItem(item);
            }

        }
    }

    popItem(item) {
        for (let k in this.selectedFrase) {
            if (item == this.selectedFrase[k]) {
                this.selectedFrase.splice(k, 1);
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
        this.callBackFn(this.op, this.frase)
            .then(() => {
                this.navCtrl.pop();
            }).catch(() => {

            });
    }

}
