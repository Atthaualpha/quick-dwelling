import { Component, OnInit } from '@angular/core';
 import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private urlIo = 'http://localhost:4028';
  private socket;

  ngOnInit() {
     // this.socket = io.connect(this.urlIo);
  }
}
