import { MsgProvider } from './../../providers/msg/msg';
import { ApiProvider } from './../../providers/api/api';
import { SlideFrasePage } from './../slide-frase/slide-frase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FrasePage } from "../frase/frase";
import { TextToSpeech } from '@ionic-native/text-to-speech';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@IonicPage()
@Component({
    selector: 'page-frases',
    templateUrl: 'frases.html',
})
export class FrasesPage {

    frases: any;
    resource = "frases";
    selectedActividad: any;

    isLoad = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private msg: MsgProvider,
        private api: ApiProvider, private toast: ToastController, private tts: TextToSpeech) {

        this.getFrases();

        this.selectedActividad = this.navParams.get('selectedActividad');
    }

    getFrases() {
        this.api.getAll(this.resource)
            .then((data) => {
                this.frases = data;
            })
            .catch(() => {

            });
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter FrasesPage');
        console.log('ionViewDidEnter FrasesPage this.isLoad', this.isLoad);
        
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad FrasesPage');
        console.log('ionViewDidLoad FrasesPage this.isLoad', this.isLoad);
        this.isLoad = true;
        pdfMake.vfs = pdfFonts.pdfMake.vfs;


        // img = await  this.api.convertFileToDataURLviaFileReader('http://a.espncdn.com/i/teamlogos/soccer/500/5.png', (res)=>{
        //     var docDefinition = {
        //         content: [
        //             {
        //                 // if you specify width, image will scale proportionally
        //                 image: res,
        //                 width: 150
        //             }
        //         ]
        //     };
        //
        //     console.log(pdfMake);
        //
        //     pdfMake.createPdf(docDefinition).download("hola.pdf");
        // });


    }

    nuevaFrase() {
        let frase = {
            name: '',
            description: '',
            items: []
        };

        this.navCtrl.push(FrasePage, {
            frase: frase,
            callBackFn: this.save,
            op: 'new'
        }, {});
    }

    editarFrase(frase) {

        this.navCtrl.push(FrasePage, {
            frase: frase,
            op: 'edit',
            callBackFn: this.save,
        });
    }

    removeItem(item) {
        this.msg.presentConfirm('Eliminar frase', '¿Estás seguro de eliminar la frase ' + item.name + '?',
            () => {
                this.api.delete(this.resource, item.id + "/item").then(() => {
                    this.frases = this.api.popItem(item, this.frases);
                });
            }
        );

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

    save = (op, frase) => {
        return new Promise((resolve, reject) => {
            console.log(frase);
            if (frase.name == "") {
                this.msg.presentToast('Primero, ingresá el nombre');
                reject();
                return;
            }
            this.msg.presentLoading('Guardando frase...');
            if (op == 'new') {
                this.api.post(this.resource, frase)
                    .then((data) => {
                        this.msg.dismissLoading();
                        this.frases = data;
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        this.msg.dismissLoading();
                        reject(error);
                    });
            } else {
                this.api.put(this.resource, frase.id, frase)
                    .then((data) => {
                        this.msg.dismissLoading();
                        this.frases = data;
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        this.msg.dismissLoading();
                        reject(error);
                    });
            }

        });
    }

    openSlide(frase) {
        this.navCtrl.push(SlideFrasePage, {
            frase: frase
        });
    }

    async printFrase(frase) {


        let columns = [];
        let urls = [];
        for (let item of frase.items) {

            urls.push({
                img: item.data.file_name,
                name: item.data.name,
            });
            // let img = await this.api.convertFileToDataURLviaFileReader('http://a.espncdn.com/i/teamlogos/soccer/500/5.png');
            // columns.push({
            //     image: img,
            //     width: 150
            // });

        }


        let str = JSON.stringify(urls);

        window.open('http://sergiosanabria.pe.hu/pdfmaker/index.html?json=' + str, "_system")

        // console.log('pdfMake',pdfMake);
        // console.log('docDefinition',pdfMake);

        // pdfMake.createPdf(docDefinition).open({}, );
    }

    addFrase(frase) {
        if (!this.api.idInArray(frase.id, this.selectedActividad.frases)) {
            this.selectedActividad.frases.push({
                frase: frase
            });
            this.msg.presentToast("Frase agregada");
        } else {
            this.msg.presentToast("La frase ya fue agregada.");
        }
    }


}
