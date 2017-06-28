import { Config } from './../../app/config/config';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthProvider } from "../auth/auth";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

/*
 Generated class for the ApiProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ApiProvider {

    apiUrl: any;
    requestUri: any;
    headers: Headers;
    options: RequestOptions;
    opt: RequestOptionsArgs;

    constructor(public http: Http,
        public _config: Config,
        private transfer: Transfer,
        public authService: AuthProvider) {
        console.log('Hello ApiProvider Provider');


        this.requestUri = _config.get('apiUrl');

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        console.log(this.authService.access_token);
        this.headers.append('Authorization', 'Bearer ' + this.authService.access_token);

        this.opt = {
            headers: this.headers
        };

        this.options = new RequestOptions(this.opt);
    }

    get(resource: string, id: number): Promise<any> {

        return this.http.get(this.requestUri + "/" + resource + "/" + id, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    getAll(resource: string, params?: any): Promise<any> {

        let search = new URLSearchParams();

        for (let k in params) {
            if (k == 'fields' || k == 'filters') {
                search.set(k, JSON.stringify(params[k]));
            } else {
                search.set(k, params[k]);
            }
        }

        let options = new RequestOptions(this.opt);

        options.params = search;

        return this.http.get(this.requestUri + '/' + resource, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);


    }


    post(resource: string, params?: any) {
        return new Promise(
            (resolve, reject) => {
                this.http.post(this.requestUri + '/' + resource, params, this.options)
                    .subscribe(
                    res => {
                        resolve(res.json());
                    },
                    (err) => {
                        reject(err);
                        console.error('err', err)
                    }
                    );

            });
    }


    put(resource: any, id: number, params): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                return this.http.put(this.requestUri + "/" + resource + "/" + id, params, this.options)
                    .subscribe(
                    res => {
                        resolve(res.json());
                    },
                    (err) => {
                        this.handleError(err);
                        reject(err);

                    }
                    );

            });

    }

    delete(resource: any, id): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                return this.http.delete(this.requestUri + "/" + resource + "/" + id, this.options)
                    .subscribe(
                    res => {
                        resolve(res.json());
                    },
                    (err) => {
                        reject(err);
                        console.error('err', err)
                    }
                    );

            });

    }

    patch(resource: any, id: number, params): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                return this.http.patch(this.requestUri + "/" + resource + "/" + id, params, this.options)
                    .subscribe(
                    res => {
                        resolve(res.json());
                    },
                    (err) => {
                        reject(err);
                        console.error('err', err)
                    }
                    );
            });
    }

    upload(file, endpoint) {
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'name.jpg',
            headers: new Headers({ 'Authorization': this.headers.get('Authorization') })

        };
        const fileTransfer: TransferObject = this.transfer.create();

        return fileTransfer.upload(file, this.requestUri + "/" + endpoint, options);
    }

    popItem(item, array) {
        for (let k in array) {
            if (item == array[k]) {
                array.splice(k, 1);
            }
        }

        return array;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        // console.error(errMsg);
        // return Promise.reject(errMsg);
        console.error(errMsg);
        return Promise.reject(error);
    }

    convertFileToDataURLviaFileReader(url) {

        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);


            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();

        });

    }

    getJSON(endpoint: string, params?: any, options?: RequestOptions) {
        if (!options) {
            options = new RequestOptions();
            options.responseType = 1;
            // let dataType: ResponseContentType;
            // dataType.
            // options.responseType
        }

        // Support easy query params for GET requests
        if (params) {
            let p = new URLSearchParams();
            for (let k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }

        return this.http.get('assets/json/' + endpoint, options);
    }

    login(data) {
        return this.post('login_check', data);
    }

    idInArray(id, array) {
        if (typeof array != "undefined" && array.length > 0) {
            for (let f of array) {
                if (f.frase.id == id) {
                    return true;
                }
            }
        }
        return false;
    }

    getMaxId(array) {
        let id = 1;
        for (let a of array) {
            if (a.id > id) {
                id = a.id;
            }
        }

        return id;
    }
}