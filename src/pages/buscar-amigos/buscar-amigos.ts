import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuscarAmigosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buscar-amigos',
  templateUrl: 'buscar-amigos.html',
})
export class BuscarAmigosPage {

  resource = "usuario";
  search = "";
  amigos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarAmigosPage');
  }

  onInput() {

    this.api.getAll(this.resource + '/buscar/amigos', {
      search: this.search
    }).then((data) => {
      this.amigos = data;
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

  enviarSolicitud(usuario) {

    this.api.post('amistads/enviars/solicituds', {
      usuarioId: usuario.id
    }).then((data) => {
      this.onInput();
    });
  }


  cancelarSolicitudAmistad(id) {

    this.api.post('amistads/cancelars/solicituds', {
      solicitudAmistadId: id
    }).then((data) => {
      this.onInput();
    });
  }

   aceptarSolicitud(id) {

    this.api.post('amistads/aceptars/solicituds', {
      solicitudAmistadId: id
    }).then((data) => {
      this.onInput();
    });
  }




}
