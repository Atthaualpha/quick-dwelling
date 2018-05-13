import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private urlIo = 'http://localhost:4028';
  private socket;

  constructor() { }

  ioConnect() {
    // this.socket = io.connect(this.urlIo);
    console.log('connected');
  }

  getSocket() {
    return this.socket;
  }
}
