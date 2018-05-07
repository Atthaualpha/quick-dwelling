import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LightsComponent } from './components/lights/lights.component';
import { DoorsComponent } from './components/doors/doors.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, LightsComponent, DoorsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
