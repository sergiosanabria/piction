import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the PalabraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-palabra',
    templateUrl: 'palabra.html',
})
export class PalabraPage {

    palabra: string;

    selectedFrase: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
        this.selectedFrase = this.navParams.get('selectedFrase');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PalabraPage');
    }

    addPalabra() {
        this.selectedFrase.push({
            data: {
                name: this.palabra
            },
            type: 'palabra',
        });

        let toast = this.toast.create({
            message: 'Palabra agregada',
            duration: 2000,

        });

        toast.present();

        this.navCtrl.pop();
    }

}
