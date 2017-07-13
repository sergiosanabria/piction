import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from "socket.io-client";

/*
  Generated class for the SocketProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SocketProvider {
  socket: SocketIOClient.Socket;

  constructor(public http: Http) {
     this.socket = io();
  }

}
