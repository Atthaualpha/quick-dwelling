import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {
  constructor(private socketService: SocketioService) {}

  private socket;
  ngOnInit() {

  }

  encenderCasa() {
    this.socket = this.socketService.getSocket();
    this.socket.emit('burn-all');
  }

  apagarCasa() {
    this.socket = this.socketService.getSocket();
    this.socket.emit('cool-all');
  }
}
