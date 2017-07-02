import { ActividadPage } from './../actividad/actividad';
import { ApiProvider } from './../../providers/api/api';
import { MsgProvider } from './../../providers/msg/msg';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActividadesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-actividades',
    templateUrl: 'actividades.html',
})
export class ActividadesPage {

    resource = "actividades";
    actividades: any;

    constructor(public navCtrl: NavController,
        private api: ApiProvider,
        private msg: MsgProvider,
        public navParams: NavParams) {
        this.getActiviades();
    }

    save = (op, actividad) => {

        return new Promise((resolve, reject) => {
            if (actividad.name == '') {
                this.msg.presentToast('Primero, ingresá el nombre');
                reject();
                return;
            }
            this.msg.presentLoading('Guardando actividad...');
            if (op == 'new') {
                this.api.post(this.resource, actividad)
                    .then((data) => {
                        this.msg.dismissLoading();
                        this.actividades = data;
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        this.msg.dismissLoading();
                        reject();
                    });
            } else {
                this.api.put(this.resource, actividad.id, actividad)
                    .then((data) => {
                        this.msg.dismissLoading();
                        this.actividades = data;
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        this.msg.dismissLoading();
                        reject();
                    });
            }

        });
    }

    getActiviades() {
        this.api.getAll(this.resource)
            .then((data) => {
                this.actividades = data;
            })
            .catch(() => {

            });
    }

    nuevaActividad() {
        let actividad = {
            name: '',
            description: '',
            frases: []
        };

        this.navCtrl.push(ActividadPage, {
            actividad: actividad,
            callBackFn: this.save,
            op: 'new'
        }, {});
    }

    editarActividad(actividad) {

        this.navCtrl.push(ActividadPage, {
            actividad: actividad,
            op: 'edit',
            callBackFn: this.save,
        });
    }

}
