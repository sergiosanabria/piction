import { FrasesPage } from './../frases/frases';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActividadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-actividad',
  templateUrl: 'actividad.html',
})
export class ActividadPage {

  actividad: any;
  op: any;
  callBackFn: any;
  resource = "actividades";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
    this.actividad = this.navParams.get('actividad');
    this.op = this.navParams.get('op');
    this.callBackFn = this.navParams.get('callBackFn');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActividadPage');
  }

  openFrases() {
    this.navCtrl.push(FrasesPage, {
      selectedActividad: this.actividad
    });
  }

  removeItem(item) {
    if (this.actividad) {

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
    for (let k in this.actividad.frases) {
      if (item == this.actividad.frases[k]) {
        this.actividad.frases.splice(k, 1);
      }
    }
  }


  save() {

    this.callBackFn(this.op, this.actividad)
      .then(() => {
        this.navCtrl.pop();
      }).catch(() => {

      })
  }

}
