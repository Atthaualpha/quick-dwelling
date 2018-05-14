import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-doors',
  templateUrl: './event-doors.component.html',
  styleUrls: ['./event-doors.component.css']
})
export class EventDoorsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private socketService: SocketioService
  ) {}
  status;
  private socket;
  private door;

  ngOnInit() {
    this.door = this.route.snapshot.paramMap.get('door');
    this.socket = this.socketService.getSocket();
    this.socket.emit('statusDoor', this.door);
    this.socket.on('resStateDoor', state => {
      this.status = state;
    });
  }

  rollEvent() {
    this.socket.emit('rollup-rollover', this.door, this.status);
  }
}
