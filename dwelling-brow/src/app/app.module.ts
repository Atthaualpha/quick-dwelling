import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LightsComponent } from './components/lights/lights.component';
import { DoorsComponent } from './components/doors/doors.component';
import { MatInputModule } from '@angular/material/input';
import { WindowComponent } from './components/window/window.component';
import { AppRouter } from './router';
import { HomeComponent } from './components/home/home.component';
import { SocketioService } from './services/socketio.service';
import { EventDoorsComponent } from './components/event-doors/event-doors.component';
import { EventLightsComponent } from './components/event-lights/event-lights.component';

@NgModule({
  declarations: [
    AppComponent,
    LightsComponent,
    DoorsComponent,
    WindowComponent,
    HomeComponent,
    EventDoorsComponent,
    EventLightsComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRouter, MatInputModule],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
