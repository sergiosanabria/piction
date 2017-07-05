import { ApiProvider } from './../../providers/api/api';
import { MsgProvider } from './../../providers/msg/msg';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


/**
 * Generated class for the RegistrarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  private form: FormGroup;
  resource = "usuarios/registers";

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private datePicker: DatePicker,
    private msg: MsgProvider,
    private api: ApiProvider,
    private events: Events,
    public navParams: NavParams) {

    this.form = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellido: [''],
      username: ['', Validators.required],
      sexo: ['m'],
      email: ['', Validators.required],
      fechaNacimiento: [''],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
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

  registrar() {

    if (this.form.get('pass1').value != this.form.get('pass2').value) {
      this.msg.presentToast("Las contraseñas no coiciden.");
      return;
    }

    this.api.post(this.resource, this.form.getRawValue())
      .then((data) => {
        this.msg.presentToast("Bienvenido Piction!!!");
        this.events.publish('user:logout');
      });

    console.log(this.form.get('pass1').value);
    console.log(this.form.getRawValue());
  }

}
