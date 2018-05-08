import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-event-lights',
  templateUrl: './event-lights.component.html',
  styleUrls: ['./event-lights.component.css']
})
export class EventLightsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private socketService: SocketioService
  ) {}
  status;
  private socket;
  private led;

  ngOnInit() {
    this.led = this.route.snapshot.paramMap.get('led');
    this.socket = this.socketService.getSocket();
    this.socket.emit('statusLed', this.led, (state) => {
      this.status = state;
    });
  }

  rollEvent() {
    this.socket.emit('cool-burn', this.led, this.status, (state) => {
      this.status = state;
    });
  }

}
