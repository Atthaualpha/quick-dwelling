import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DoorsComponent } from './components/doors/doors.component';
import { LightsComponent } from './components/lights/lights.component';
import { WindowComponent } from './components/window/window.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'doors',
    component: DoorsComponent
  },
  {
    path: 'lights',
    component: LightsComponent
  },
  {
    path: 'window',
    component: WindowComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouter { }
