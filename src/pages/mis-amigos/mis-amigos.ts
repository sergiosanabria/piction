import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MisAmigosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mis-amigos',
  templateUrl: 'mis-amigos.html',
})
export class MisAmigosPage {

  resource = "usuario";
  search = "";
  amigos: any;

  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisAmigosPage');
    this.onInput();
  }

  onInput() {

    this.api.getAll('amistad/mis/amigos', {
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

}
