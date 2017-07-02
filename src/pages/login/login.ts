import { RegistrarPage } from './../registrar/registrar';
import { TabsPage } from './../tabs/tabs';
import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';
import { IonicPage, AlertController, App, LoadingController, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { TimeoutError } from "rxjs/Rx";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;

  loader: any;
  public backgroundImage = "assets/img/background/background-5.jpg";

  constructor(
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private api: ApiProvider,
    private auth: AuthProvider,
    private toastCtrl: ToastController,
    public app: App) {

    this.loginForm = {
      _username: '',
      _password: '',
    };

  }

  login() {

    if (this.loginForm._username == "" || this.loginForm._password == "") {
      this.presentToast("Ingresá tu usuario y contraseña.")
    } else {

      this.presentLoading('Iniciando sessión...');


      this.auth.login(this.loginForm).then(
        (result) => {
          console.log('iniciarSesion result', result);
          this.navCtrl.push(TabsPage);
          this.dismissLoading();
        }
      ).catch(this.handleError.bind(this));

    }

  }

  handleError(error: Response | any) {
    if (error instanceof TimeoutError) {
      let msg = 'No se puede conectar con el servidor';
      console.log(msg)
      this.presentToast(msg)
    }
    if (error.status == 401 && (this.loginForm._username !== '')) {
      this.presentToast('Nombre de usuario o contraseña incorrectos');
    }
    if (error.status == 0 && (this.loginForm._username !== '')) {
      this.presentToast('No se puede conectar con el servidor');
    }

    this.dismissLoading();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

  dismissLoading() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }
  goToSignup() {
    this.navCtrl.push(RegistrarPage);
  }

  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

  step = 0;
  //color table indices for: 
  // [current color left,next color left,current color right,next color right]
  colorIndices = [0, 1, 2, 3];

  //transition speed
  gradientSpeed = 0.00005;
  gradient = "";

  updateGradient() {

    let c0_0 = this.colors[this.colorIndices[0]];
    let c0_1 = this.colors[this.colorIndices[1]];
    let c1_0 = this.colors[this.colorIndices[2]];
    let c1_1 = this.colors[this.colorIndices[3]];

    let istep = 1 - this.step;
    let r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
    let g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
    let b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
    let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    let r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
    let g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
    let b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
    let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    this.gradient = "-webkit-gradient(linear, left top, right bottom, from(" + color1 + "), to(" + color2 + "))";
    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      //pick two new target color indices
      //do not pick the same as the current one
      this.colorIndices[1] = (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
      this.colorIndices[3] = (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;

    }
    setInterval(() => { this.updateGradient() }, 40);
  }
}
