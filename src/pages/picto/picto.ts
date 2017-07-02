import { PictoCustomPage } from './../picto-custom/picto-custom';
import { MsgProvider } from './../../providers/msg/msg';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';

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
    pictosCustom: any;
    pictogramasShow: any;
    tipo = "json";
    resource = "pictogramas";

    selectedFrase: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public api: ApiProvider,
        private msg: MsgProvider,

        private file: File,
        private tts: TextToSpeech) {

        this.selectedFrase = this.navParams.get('selectedFrase');

        this.api.getJSON('pictogramas.json').subscribe((response) => {
            this.pictogramas = response.json();
        });

        this.getPictosCustom();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PictoPage');
    }

    getPictosCustom() {
        this.api.getAll(this.resource)
            .then((data) => {
                this.pictosCustom = data;
                this.tipoChanged();
            })
            .catch(() => {

            });
    }

    tipoChanged() {
        this.pictogramasShow = [];
        if (this.tipo == 'custom') {
            if (typeof this.pictosCustom == "undefined") {
                return;
            }
            for (let item of this.pictosCustom) {
                this.pictogramasShow.push(item);
            }

        } else {
            this.onInput();
        }
    }

    onInput() {
        this.pictogramasShow = [];

        if (this.tipo == 'json') {
            let limit = 50;
            let cant = 0;

            if (this.search.trim() != '') {

                for (let item of this.pictogramas) {

                    if (limit < cant) {
                        return;
                    }

                    let str = JSON.stringify(item);
                    str = str.toLowerCase();
                    this.search = this.search.toLowerCase();

                    if (this.search == item.name) {
                        cant++;
                        this.pictogramasShow.push(item);
                        continue;
                    }

                    if (str.indexOf(this.search) >= 0) {
                        cant++;
                        this.pictogramasShow.push(item);
                    }
                }
            }
        } else {
            if (this.search.trim() != '') {
                if (typeof this.pictosCustom == "undefined") {
                    return;
                }
                for (let item of this.pictosCustom) {

                    let str = JSON.stringify(item);
                    str = str.toLowerCase();
                    this.search = this.search.toLowerCase();

                    if (this.search == item.name) {
                        this.pictogramasShow.push(item);
                        continue;
                    }

                    if (str.indexOf(this.search) >= 0) {
                        this.pictogramasShow.push(item);
                    }
                }
            } else {
                this.tipoChanged();
            }
        }


    }

    addPictograma(pic) {
        this.selectedFrase.push({
            data: pic,
            type: this.tipo == "json" ? 'picto' : 'custom',
        });

        this.msg.presentToast('Pictograma agregado');
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

    nuevoPicto() {
        let picto = {
            name: '',
            description: '',
            file: ''
        };

        this.navCtrl.push(PictoCustomPage, {
            picto: picto,
            callBackFn: this.save,
            op: 'new'
        }, {});
    }

    editarPicto(picto) {

        this.navCtrl.push(PictoCustomPage, {
            picto: picto,
            op: 'edit',
            callBackFn: this.save,
        });
    }

    deletePicto(picto) {
        this.msg.presentConfirm('Eliminar picto', '¿Estás seguro de eliminar el pictograma ' + picto.name + ' ?',
            () => {
                this.api.delete(this.resource, picto.id).then(() => {
                    this.pictosCustom = this.api.popItem(picto, this.pictosCustom);
                    this.pictogramasShow = this.api.popItem(picto, this.pictogramasShow);
                });
            }
        );
    }

    save = (op, picto) => {

        return new Promise((resolve, reject) => {
            if (picto.name == "") {
                this.msg.presentToast('Primero, ingresá el nombre');
                reject();
                return;
            }
            this.msg.presentLoading('Guardando Picto...');
            if (op == 'new') {
                this.api.post(this.resource, picto).then((id) => {
                    console.log('pictoID:', id);

                    if (picto.file) {
                        this.api.upload(picto.file, this.resource + '/' + id + '/images').then(() => {
                            this.getPictosCustom();
                            this.msg.presentToast("Picto guardado correctamente.");
                            this.msg.dismissLoading();
                        }).catch((err) => {
                            this.msg.dismissLoading();
                            console.log(err);
                        });
                    } else {
                        this.msg.dismissLoading();
                        this.getPictosCustom();
                        this.msg.presentToast("Picto guardado correctamente.");
                    }

                    resolve(picto);
                }).catch((err) => {
                    reject(err);
                });
            } else {
                this.api.put(this.resource, picto.id, picto).then((id) => {
                    console.log('pictoID:', id);

                    if (picto.file) {
                        this.api.upload(picto.file, this.resource + '/' + id + '/images').then(() => {
                            this.getPictosCustom();
                            this.msg.dismissLoading();
                            this.msg.presentToast("Picto guardado correctamente.");
                        }).catch((err) => {
                            this.msg.dismissLoading();
                            console.log(err);
                        });
                    } else {
                        this.getPictosCustom();
                        this.msg.dismissLoading();
                        this.msg.presentToast("Picto guardado correctamente.");
                    }

                    resolve(picto);
                }).catch((err) => {
                    reject(err);
                });
            }

        });

    }

}
