import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GMapComponent } from './g-map/g-map.component';
import { GMapInteractiveComponent } from './g-map-interactive/g-map-interactive.component'

const routes: Routes = [
  { path: '', redirectTo: 'gmap', pathMatch: 'full' },
  { path: 'gmap', component: GMapComponent },
  { path: 'interact', component: GMapInteractiveComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
