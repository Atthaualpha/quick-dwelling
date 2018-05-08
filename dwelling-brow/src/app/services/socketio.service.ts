import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private urlIo = 'http://localhost:4028';
  private socket;

  constructor() { }

  ioConnect() {
    this.socket = io.connect(this.urlIo);
  }
}
