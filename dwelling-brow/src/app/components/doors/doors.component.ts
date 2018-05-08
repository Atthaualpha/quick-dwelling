import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit {
  constructor(private socketService: SocketioService) {}

  private socket;

  ngOnInit() {
    this.socket = this.socketService.getSocket();

  }
}
