import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  constructor(private socketService: SocketioService) {}

  status;
  private socket;

  ngOnInit() {
    this.socket = this.socketService.getSocket();
    this.socket.emit('statusWindow');
    this.socket.on('resWindowState', state => {
      this.status = state;
    });
  }

  wheelWindow() {
    this.socket.emit('wheelWindow', this.status);
  }
}
