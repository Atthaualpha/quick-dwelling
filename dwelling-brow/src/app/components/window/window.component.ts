import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  constructor(private socketService: SocketioService) {}

  private socket;

  ngOnInit() {
    this.socket = this.socketService.getSocket();
  }
}
