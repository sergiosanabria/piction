import { Events } from 'ionic-angular';
import { Config } from './../../app/config/config';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import { Storage } from "@ionic/storage";

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {

  public access_token: any;
  apiUrl: any;
  requestUri: any;
  headers: Headers;
  options: RequestOptions;
  opt: RequestOptionsArgs;
  timeout = 10000;

  constructor(public http: Http,
    public _config: Config,
    private events: Events,
    public storage: Storage) {

    console.log('Hello AuthProvider Provider');

    this.requestUri = _config.get('apiUrl');
    this.apiUrl = _config.get('apiUrl');

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    this.opt = {
      headers: this.headers
    };

    this.options = new RequestOptions(this.opt);


  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.http.get(this.requestUri + '/check', this.options)
        .timeout(this.timeout)
        .subscribe(res => {
          resolve(res.json());
          console.log('getUser res', res);
        },
        (err) => {
          reject(err);
          console.error('getUser err', err);
        })
        ;
    })
  }

  checkAuthentication(token?) {

    return new Promise(
      (resolve, reject) => {

        if (typeof token === "undefined") {
          //Load token if exists
          this.storage.get('access_token').then(
            (value) => {
              console.log('token', value);
              if (value === null) {
                reject({ "status": 401 });
                console.error('no tiene token');
              }

              this.access_token = value;

              this.events.publish("token:set", this.access_token);

              this.headers.set('Authorization', 'Bearer ' + this.access_token);
              this.opt = {
                headers: this.headers
              };

              this.options = new RequestOptions(this.opt);

              this.http.get(this.requestUri + '/check', this.options)
                .timeout(this.timeout)
                .subscribe(res => {
                  resolve(res.json());
                  console.log('checkAuthentication res', res);
                },
                (err) => {
                  reject(err);
                  console.error('checkAuthentication err', err);
                })
                ;

            });
        } else {
          this.http.get(this.requestUri + '/check', this.options)
            .timeout(this.timeout)
            .subscribe(res => {
              resolve(res.json());
              console.log('checkAuthentication res', res);
            },
            (err) => {
              reject(err);
              console.error('checkAuthentication err', err);
            })
            ;
        }


      });

  }

  login(credentials) {

    return new Promise(
      (resolve, reject) => {

        console.log('options lo que va', this.options);

        this.http.post(this.apiUrl + '/login_check', JSON.stringify(credentials), this.options)
          .timeout(this.timeout)
          .subscribe(res => {

            let data = res.json();
            console.log('login data', data)
            this.access_token = data.token;
            this.storage.set('access_token', this.access_token);

            this.events.publish("token:set", this.access_token);

            this.headers.set('Authorization', 'Bearer ' + this.access_token);
            this.opt = {
              headers: this.headers
            };

            this.checkAuthentication(this.access_token).then((usuario) => {
              this.events.publish("user:login", usuario);
            })
              .catch(() => {
                this.events.publish("user:logout");
              });


            resolve(data);

            resolve(res.json());
          }, (err) => {
            reject(err);
            console.error('err', err)
          });

      });

  }

  logout() {
    return new Promise(
      (resolve, reject) => {

        this.access_token = null;
        this.storage.set('access_token', null);
        this.storage.clear();

        resolve();

        // TODO cuando ande el delete comentar lo que esta arriba y descomentar lo de abajo
        // this.http.delete(this.apiUrl + '/oauth/tokens/' + value, this.options)
        //     .subscribe(
        //         res => {
        //
        //             let data = res.json();
        //
        //             this.access_token = '';
        //             this.storage.set('access_token', '');
        //             resolve(data);
        //
        //             resolve(res.json());
        //         },
        //         (err) => {
        //             reject(err);
        //             console.error('err', err)
        //         }
        //     );


      });
  }

}