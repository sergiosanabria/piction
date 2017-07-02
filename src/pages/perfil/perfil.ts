import { ApiProvider } from './../../providers/api/api';
import { MsgProvider } from './../../providers/msg/msg';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private form: FormGroup;
  usuario: any;
  persona: any;
  resource = "usuarios/registers";

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private datePicker: DatePicker,
    private msg: MsgProvider,
    private api: ApiProvider,
    private events: Events,
    public navParams: NavParams) {

    this.usuario = this.navParams.get('usuario');
    this.persona = this.usuario.persona;

    this.form = this.formBuilder.group({
      nombre: [this.persona.nombre, Validators.required],
      apellido: [this.persona.apellido],
      sexo: [this.persona.sexo],
      perfil: [this.persona.perfil],
      fechaNacimiento: [this.persona.fecha_nacimiento],
    });
  }

  ionViewDidLoad() {

  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      locale: 'es'
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  save() {
    console.log(this.form.get('fechaNacimeinto'));
    this.api.put("persona", 0, this.form.getRawValue()).then((data) => {
      this.msg.presentToast("Tu perfil ha sido guardado correctamente.");
      this.navCtrl.pop();
      this.events.publish('user:update', data)
      
    });;
  }

}
