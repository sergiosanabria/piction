import { RegistrarAlumnoPage } from './../pages/registrar-alumno/registrar-alumno';
import { SolicitudesRecibidasPage } from './../pages/solicitudes-recibidas/solicitudes-recibidas';
import { MisAmigosPage } from './../pages/mis-amigos/mis-amigos';
import { BuscarAmigosPage } from './../pages/buscar-amigos/buscar-amigos';
import { ImgcacheService } from './../directives/img-cache/services/cache-img/cache-img.service';
import { PerfilPage } from './../pages/perfil/perfil';
import { PictoPage } from './../pages/picto/picto';
import { ApiProvider } from './../providers/api/api';
import { AuthProvider } from './../providers/auth/auth';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, Events, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';


import { TabsPage } from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild('foto') foto: ElementRef;

    rootPage: any;
    usuario: any;
    pages = [
        {
            icon: 'home',
            title: 'home',
            class: PictoPage
        },
        {
            icon: 'people',
            title: 'Mis amigos',
            class: MisAmigosPage
        },
        {
            icon: 'search',
            title: 'Buscar amigos',
            class: BuscarAmigosPage
        },
        {
            icon: 'search',
            title: 'Solicitudes de amistad',
            class: SolicitudesRecibidasPage
        },
        {
            icon: 'person-add',
            title: 'Solicitudes de amistad',
            class: RegistrarAlumnoPage
        }
    ];

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private auth: AuthProvider,
        public events: Events,
        private api: ApiProvider,
        private imagePicker: ImagePicker,
        private crop: Crop,
        public menuCtrl: MenuController,
        imgcacheService: ImgcacheService
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            // initialize imgCache library and set root
            imgcacheService.initImgCache().then(() => {
                // this.nav.setRoot(this.rootPage);
            });

            this.listenToEvents();
            // this.menuCtrl.enable(false, 'menu');
            // this.menuCtrl.swipeEnable(false, 'menu');

            this.auth.checkAuthentication().then((usuario) => {

                console.log(usuario);
                this.events.publish("user:login", usuario);
            }).catch(() => {
                this.events.publish("user:logout");
            });

        });
    }

    listenToEvents() {
        this.events.subscribe('user:logout', () => {
            console.log('logout event');
            this.auth.logout().then(() => {
                this.nav.setRoot(LoginPage);
                this.menuCtrl.enable(false, 'menu');
                this.menuCtrl.swipeEnable(false, 'menu');
            });
        });

        this.events.subscribe('user:login', (usuario) => {
            console.log('login event');
            this.nav.setRoot(TabsPage);
            this.usuario = usuario;
            this.errorImgUser();
            this.menuCtrl.enable(true, 'menu');
            this.menuCtrl.swipeEnable(true, 'menu');
            this.goToHome();
        });

        this.events.subscribe('user:update', (usuario) => {
            console.log('user:update', usuario);
            this.usuario = usuario;

            // this.goToHome();
        });

        this.events.subscribe("token:set", (token) => {

            if (this.api.headers.has("Authorization")) {
                this.api.headers.set('Authorization', 'Bearer ' + token);
            } else {
                this.api.headers.append('Authorization', 'Bearer ' + token);
            }

        });

    }

    goToHome() {
        this.nav.setRoot(TabsPage);
    }

    openPage(p) {
        this.nav.push(p.class);
    }

    editarPerfil() {
        this.menuCtrl.close();
        this.nav.push(PerfilPage, {
            usuario: this.usuario
        });
    }

    editarFoto() {
        console.log('editarFoto');
        this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((imageFile) => {
            imageFile = imageFile[0];
            this.crop.crop(imageFile, { quality: 100 })
                .then(
                (newImage) => {

                    console.log(newImage);
                    try {
                        this.api.upload(newImage, 'personas/images').then((data) => {
                            this.auth.getUser().then((data) => {
                                this.usuario = data;
                            });


                        }).catch((error) => console.log(error));
                    } catch (error) {
                        console.log(error);
                    }

                },
                (error) => {
                    console.error('Error cropping image', error)
                }
                );


        }, (err) => { });
    }


    errorImgUser() {
        if (typeof this.usuario == "undefined") {
            return;
        }
        if (this.usuario.persona.sexo == 'm') {
            this.foto.nativeElement.src = 'assets/gender/m.svg';
        } else {
            this.foto.nativeElement.src = 'assets/gender/f.svg';
        }
    }

    logout() {

        this.events.publish('user:logout');

    }
}
