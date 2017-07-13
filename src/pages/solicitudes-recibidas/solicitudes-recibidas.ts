import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SolicitudesRecibidasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-solicitudes-recibidas',
  templateUrl: 'solicitudes-recibidas.html',
})
export class SolicitudesRecibidasPage {

  search = "";
  solicitudes: any;


  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitudesRecibidasPage');
    this.cargarSolicitudes();
  }


  cargarSolicitudes() {

    this.api.getAll('amistad/solicitudes/recibidas', {
      search: this.search
    }).then((data) => {
      this.solicitudes = data;
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  errorImage(usuario, event) {

    console.log(event);
    if (typeof usuario == "undefined") {
      return;
    }
    if (usuario.persona.sexo == 'm') {
      event.srcElement.src = 'assets/gender/m.svg';
    } else {
      event.srcElement.src = 'assets/gender/f.svg';
    }
  }


  cancelarSolicitudAmistad(id) {

    this.api.post('amistads/cancelars/solicituds', {
      solicitudAmistadId: id
    }).then((data) => {
      this.cargarSolicitudes();
    });
  }

   aceptarSolicitud(id) {

    this.api.post('amistads/aceptars/solicituds', {
      solicitudAmistadId: id
    }).then((data) => {
      this.cargarSolicitudes();
    });
  }


}
