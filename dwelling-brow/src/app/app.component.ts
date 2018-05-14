import { Component, OnInit } from '@angular/core';
import { SocketioService } from './services/socketio.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private socket;
  thempt = 0;
  constructor(
    private socketService: SocketioService,
    private location: Location
  ) {}

  ngOnInit() {
    this.socketService.ioConnect();
    this.socket = this.socketService.getSocket();
    this.socket.on('resThemptState', state => {
      this.thempt = state;
    });
  }

  goBack() {
    this.location.back();
  }
}
