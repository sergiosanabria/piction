import { Config } from './../../app/config/config';
import { CacheService } from "ionic-cache";
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
    isCache: boolean;
    isDebug: boolean;
    tokenDebug: string;

    constructor(public http: Http,
        public _config: Config,
        private transfer: Transfer,
        private cache: CacheService,
        public authService: AuthProvider) {
        console.log('Hello ApiProvider Provider');


        this.requestUri = _config.get('apiUrl');

        this.isCache = _config.get('isCache');
        this.isDebug = _config.get('isDebug');

        if (this.isDebug) {
            this.tokenDebug = _config.get('tokenDebug');
        }


        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', 'Bearer ' + this.authService.access_token);

        this.opt = {
            headers: this.headers
        };

        this.options = new RequestOptions(this.opt);

        if (this.isCache) {
            // Set TTL to 12h
            cache.setDefaultTTL(60 * 60 * 12);

            // Keep our cached results when device is offline!
            cache.setOfflineInvalidate(false);
        }

    }

    get(resource: string, id: number): Promise<any> {

        return this.http.get(this.requestUri + "/" + resource + "/" + id, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    getAll(resource: string, params?: any, forceReload = false): Promise<any> {

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

        let url = this.requestUri + '/' + resource;

        if (this.isDebug) {
            url += '?XDEBUG_SESSION_START=' + this.tokenDebug;
        }

        let req = this.http.get(url, options);

        if (this.isCache) {
            let result: any;

            if (forceReload) {
                result = this.cache.loadFromDelayedObservable(url, req, resource, 0, 'all');
            } else {
                result = this.cache.loadFromObservable(url, req, resource);
            }

            return result
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        } else {
            return req
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        }




    }


    post(resource: string, params?: any) {
        return new Promise(
            (resolve, reject) => {
                let url = this.requestUri + '/' + resource;

                if (this.isDebug) {
                    url += '?XDEBUG_SESSION_START=' + this.tokenDebug;
                }
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
                let url: string;
                if (id) {
                    url = this.requestUri + "/" + resource + "/" + id;
                } else {
                    url = this.requestUri + "/" + resource;
                }

                if (this.isDebug) {
                    url += '?XDEBUG_SESSION_START=' + this.tokenDebug;
                }

                return this.http.put(url, params, this.options)
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


        console.log("errMsg", error);


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